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
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      course TEXT NOT NULL,
      testimonial TEXT NOT NULL,
      approved INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check and add approved column if missing
  const columns = db.exec(`PRAGMA table_info(testimonials)`);
  const hasApprovedColumn = columns.length > 0 && columns[0].values.some((row: any) => row[1] === 'approved');
  
  if (!hasApprovedColumn) {
    db.run(`ALTER TABLE testimonials ADD COLUMN approved INTEGER NOT NULL DEFAULT 0`);
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

export async function saveTestimonial(input: {
  name: string;
  course: string;
  testimonial: string;
}) {
  const database = await initDatabase();
  
  database.run(
    `INSERT INTO testimonials (name, course, testimonial, approved) VALUES (?, ?, ?, 0)`,
    [input.name, input.course, input.testimonial]
  );

  saveDatabase();

  // Get the last inserted ID
  const result = database.exec(`SELECT last_insert_rowid() as id`);
  const id = result.length > 0 ? result[0].values[0][0] : 0;

  return { id: Number(id) };
}

export async function getApprovedTestimonials() {
  const database = await initDatabase();

  const result = database.exec(`
    SELECT id, name, course, testimonial, created_at
    FROM testimonials
    WHERE approved = 1
    ORDER BY id DESC
  `);

  if (result.length === 0) return [];

  return result[0].values.map((row: any) => ({
    id: Number(row[0]),
    name: String(row[1]),
    course: String(row[2]),
    testimonial: String(row[3]),
    created_at: String(row[4]),
  }));
}

export async function getPendingTestimonials() {
  const database = await initDatabase();

  const result = database.exec(`
    SELECT id, name, course, testimonial, created_at
    FROM testimonials
    WHERE approved = 0
    ORDER BY id DESC
  `);

  if (result.length === 0) return [];

  return result[0].values.map((row: any) => ({
    id: Number(row[0]),
    name: String(row[1]),
    course: String(row[2]),
    testimonial: String(row[3]),
    created_at: String(row[4]),
  }));
}

export async function approveTestimonial(id: number) {
  const database = await initDatabase();

  database.run(`UPDATE testimonials SET approved = 1 WHERE id = ?`, [id]);
  saveDatabase();

  return { changes: 1 };
}
