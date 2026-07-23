import { NextResponse } from 'next/server';

const adminPassword = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submittedPassword = String(body.password || '');

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin password is not configured.' },
        { status: 500 }
      );
    }

    if (submittedPassword !== adminPassword) {
      return NextResponse.json(
        { error: 'Incorrect password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('skilloria_admin_session', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Failed to handle admin login:', error);

    return NextResponse.json(
      { error: 'Unable to process login request.' },
      { status: 500 }
    );
  }
}
