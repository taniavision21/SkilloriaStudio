import { NextResponse } from 'next/server';
import { getApprovedTestimonials, getPendingTestimonials, saveTestimonial } from '../../../lib/testimonials-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'approved';

  const submissions = status === 'pending' ? getPendingTestimonials() : getApprovedTestimonials();

  return NextResponse.json({ submissions });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const course = String(body.course || '').trim();
    const testimonial = String(body.testimonial || '').trim();

    if (!name || !course || !testimonial) {
      return NextResponse.json(
        { error: 'Please complete all fields before submitting.' },
        { status: 400 }
      );
    }

    const result = saveTestimonial({ name, course, testimonial });

    return NextResponse.json({
      success: true,
      id: result.id,
    });
  } catch (error) {
    console.error('Failed to save testimonial:', error);

    return NextResponse.json(
      { error: 'Unable to save testimonial right now.' },
      { status: 500 }
    );
  }
}
