import { NextResponse } from 'next/server';
import { approveContact } from '../../../../../lib/contacts-db';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: 'Invalid contact id.' }, { status: 400 });
  }

  const result = await approveContact(numericId);

  if (result.changes === 0) {
    return NextResponse.json({ error: 'Contact query not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
