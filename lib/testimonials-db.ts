import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbDirectory = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDirectory, 'testimonials.db');

fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course TEXT NOT NULL,
    testimonial TEXT NOT NULL,
    approved INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

const testimonialColumns = db.prepare('PRAGMA table_info(testimonials)').all() as Array<{ name: string }>;
const hasApprovedColumn = testimonialColumns.some((column) => column.name === 'approved');

if (!hasApprovedColumn) {
  db.prepare(`ALTER TABLE testimonials ADD COLUMN approved INTEGER NOT NULL DEFAULT 0`).run();
}

export function saveTestimonial(input: {
  name: string;
  course: string;
  testimonial: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO testimonials (name, course, testimonial, approved)
    VALUES (@name, @course, @testimonial, 0)
  `);

  const result = stmt.run(input);

  return { id: Number(result.lastInsertRowid) };
}

export function getApprovedTestimonials() {
  return db
    .prepare(`
      SELECT id, name, course, testimonial, created_at
      FROM testimonials
      WHERE approved = 1
      ORDER BY id DESC
    `)
    .all() as Array<{
      id: number;
      name: string;
      course: string;
      testimonial: string;
      created_at: string;
    }>;
}

export function getPendingTestimonials() {
  return db
    .prepare(`
      SELECT id, name, course, testimonial, created_at
      FROM testimonials
      WHERE approved = 0
      ORDER BY id DESC
    `)
    .all() as Array<{
      id: number;
      name: string;
      course: string;
      testimonial: string;
      created_at: string;
    }>;
}

export function approveTestimonial(id: number) {
  const stmt = db.prepare(`
    UPDATE testimonials
    SET approved = 1
    WHERE id = @id
  `);

  const result = stmt.run({ id });

  return { changes: Number(result.changes) };
}
