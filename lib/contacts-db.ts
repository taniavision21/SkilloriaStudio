import fs from 'fs';
import path from 'path';
import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';

const dbDirectory = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDirectory, 'testimonials.db');

let db: SqlJsDatabase | null = null;
let SQL: any = null;

async function initDatabase() {
  if (db) return db;

  if (!SQL) {
    SQL = await initSqlJs();
  }

  fs.mkdirSync(dbDirectory, { recursive: true });

  // Try to load existing database
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  if (!db) throw new Error('Failed to initialize database');

  // Create table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check and add status column if missing
  const columns = db.exec(`PRAGMA table_info(contacts)`);
  const hasStatusColumn = columns.length > 0 && columns[0].values.some((row: any) => row[1] === 'status');
  
  if (!hasStatusColumn) {
    db.run(`ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'new'`);
  }

  saveDatabase();
  return db;
}

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

export async function saveContact(input: {
  name: string;
  email: string;
  message: string;
}) {
  const database = await initDatabase();

  database.run(
    `INSERT INTO contacts (name, email, message, status) VALUES (?, ?, ?, 'new')`,
    [input.name, input.email, input.message]
  );

  saveDatabase();

  // Get the last inserted ID
  const result = database.exec(`SELECT last_insert_rowid() as id`);
  const id = result.length > 0 ? result[0].values[0][0] : 0;

  return { id: Number(id) };
}

export async function getContacts() {
  const database = await initDatabase();

  const result = database.exec(`
    SELECT id, name, email, message, status, created_at
    FROM contacts
    ORDER BY id DESC
  `);

  if (result.length === 0) return [];

  return result[0].values.map((row: any) => ({
    id: Number(row[0]),
    name: String(row[1]),
    email: String(row[2]),
    message: String(row[3]),
    status: String(row[4]),
    created_at: String(row[5]),
  }));
}

export async function approveContact(id: number) {
  const database = await initDatabase();

  database.run(`UPDATE contacts SET status = 'approved' WHERE id = ?`, [id]);
  saveDatabase();

  return { changes: 1 };
}

export async function deleteContact(id: number) {
  const database = await initDatabase();

  database.run(`DELETE FROM contacts WHERE id = ?`, [id]);
  saveDatabase();

  return { changes: 1 };
}
