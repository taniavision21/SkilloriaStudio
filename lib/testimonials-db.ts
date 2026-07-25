import fs from 'fs';
import os from 'os';
import path from 'path';

const dbDirectory = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'skilloria-data')
  : path.join(process.cwd(), 'data');
const dbPath = path.join(dbDirectory, 'testimonials.json');

export type TestimonialRecord = {
  id: number;
  name: string;
  course: string;
  testimonial: string;
  approved: boolean;
  created_at: string;
};

function ensureDirectory() {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

function readTestimonials(): TestimonialRecord[] {
  ensureDirectory();

  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const raw = fs.readFileSync(dbPath, 'utf8');
  try {
    return JSON.parse(raw) as TestimonialRecord[];
  } catch {
    return [];
  }
}

function writeTestimonials(data: TestimonialRecord[]) {
  ensureDirectory();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function saveTestimonial(input: {
  name: string;
  course: string;
  testimonial: string;
}) {
  const testimonials = readTestimonials();
  const nextId = testimonials.length > 0 ? Math.max(...testimonials.map((item) => item.id)) + 1 : 1;
  const record: TestimonialRecord = {
    id: nextId,
    name: input.name,
    course: input.course,
    testimonial: input.testimonial,
    approved: false,
    created_at: new Date().toISOString(),
  };

  testimonials.push(record);
  writeTestimonials(testimonials);

  return { id: record.id };
}

export async function getApprovedTestimonials() {
  const testimonials = readTestimonials();
  return testimonials
    .filter((item) => item.approved)
    .sort((a, b) => b.id - a.id);
}

export async function getPendingTestimonials() {
  const testimonials = readTestimonials();
  return testimonials
    .filter((item) => !item.approved)
    .sort((a, b) => b.id - a.id);
}

export async function approveTestimonial(id: number) {
  const testimonials = readTestimonials();
  const testimonial = testimonials.find((item) => item.id === id);

  if (!testimonial) {
    return { changes: 0 };
  }

  testimonial.approved = true;
  writeTestimonials(testimonials);
  return { changes: 1 };
}
