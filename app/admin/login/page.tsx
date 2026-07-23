'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') || '');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result.error || 'Unable to sign in.');
      return;
    }

    router.push('/admin/testimonials');
  }

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '500px' }}>
      <section style={{ background: '#fff', borderRadius: '14px', padding: '2rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Admin Login</h1>
        <p style={{ color: '#555', marginBottom: '1rem' }}>Enter the admin password to access the review dashboard.</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem' }}
          />
          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        {errorMessage ? (
          <p style={{ marginTop: '1rem', color: '#b91c1c', fontWeight: 500 }}>{errorMessage}</p>
        ) : null}
      </section>
    </div>
  );
}
