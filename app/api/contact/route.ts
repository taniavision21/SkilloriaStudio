import { NextResponse } from 'next/server';
import { saveContact } from '../../../lib/contacts-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please complete all fields before submitting.' },
        { status: 400 }
      );
    }

    const result = saveContact({ name, email, message });

    return NextResponse.json({
      success: true,
      id: result.id,
    });
  } catch (error) {
    console.error('Failed to save contact submission:', error);

    return NextResponse.json(
      { error: 'Unable to save your message right now.' },
      { status: 500 }
    );
  }
}
