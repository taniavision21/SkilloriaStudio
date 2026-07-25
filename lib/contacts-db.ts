import fs from 'fs';
import os from 'os';
import path from 'path';

const dbDirectory = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'skilloria-data')
  : path.join(process.cwd(), 'data');
const dbPath = path.join(dbDirectory, 'contacts.json');

export type ContactRecord = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'approved';
  created_at: string;
};

function ensureDirectory() {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

function readContacts(): ContactRecord[] {
  ensureDirectory();

  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const raw = fs.readFileSync(dbPath, 'utf8');
  try {
    return JSON.parse(raw) as ContactRecord[];
  } catch {
    return [];
  }
}

function writeContacts(data: ContactRecord[]) {
  ensureDirectory();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function saveContact(input: {
  name: string;
  email: string;
  message: string;
}) {
  const contacts = readContacts();
  const nextId = contacts.length > 0 ? Math.max(...contacts.map((item) => item.id)) + 1 : 1;
  const record: ContactRecord = {
    id: nextId,
    name: input.name,
    email: input.email,
    message: input.message,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  contacts.push(record);
  writeContacts(contacts);

  return { id: record.id };
}

export async function getContacts() {
  return readContacts().sort((a, b) => b.id - a.id);
}

export async function approveContact(id: number) {
  const contacts = readContacts();
  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    return { changes: 0 };
  }

  contact.status = 'approved';
  writeContacts(contacts);
  return { changes: 1 };
}

export async function deleteContact(id: number) {
  const contacts = readContacts();
  const remaining = contacts.filter((item) => item.id !== id);

  if (remaining.length === contacts.length) {
    return { changes: 0 };
  }

  writeContacts(remaining);
  return { changes: 1 };
}
