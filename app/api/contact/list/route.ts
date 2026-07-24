import { NextResponse } from 'next/server';
import { getContacts } from '../../../../lib/contacts-db';

export async function GET() {
  const submissions = await getContacts();

  return NextResponse.json({ submissions });
}
