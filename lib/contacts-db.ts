import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbDirectory = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDirectory, 'testimonials.db');

fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(dbPath);

const contactColumns = db.prepare('PRAGMA table_info(contacts)').all() as Array<{ name: string }>;
const hasStatusColumn = contactColumns.some((column) => column.name === 'status');

if (!hasStatusColumn) {
  db.prepare(`ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'new'`).run();
}

db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export function saveContact(input: {
  name: string;
  email: string;
  message: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, message, status)
    VALUES (@name, @email, @message, 'new')
  `);

  const result = stmt.run(input);

  return { id: Number(result.lastInsertRowid) };
}

export function getContacts() {
  return db
    .prepare(`
      SELECT id, name, email, message, status, created_at
      FROM contacts
      ORDER BY id DESC
    `)
    .all() as Array<{
      id: number;
      name: string;
      email: string;
      message: string;
      status: string;
      created_at: string;
    }>;
}

export function approveContact(id: number) {
  const stmt = db.prepare(`
    UPDATE contacts
    SET status = 'approved'
    WHERE id = @id
  `);

  const result = stmt.run({ id });

  return { changes: Number(result.changes) };
}

export function deleteContact(id: number) {
  const stmt = db.prepare(`
    DELETE FROM contacts
    WHERE id = @id
  `);

  const result = stmt.run({ id });

  return { changes: Number(result.changes) };
}
