import { NextResponse } from 'next/server';
import { approveTestimonial } from '../../../../lib/testimonials-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { error: 'A valid testimonial id is required.' },
        { status: 400 }
      );
    }

    const result = approveTestimonial(id);

    return NextResponse.json({
      success: true,
      changes: result.changes,
    });
  } catch (error) {
    console.error('Failed to approve testimonial:', error);

    return NextResponse.json(
      { error: 'Unable to approve testimonial right now.' },
      { status: 500 }
    );
  }
}
