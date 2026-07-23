'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(result.error || 'Unable to send your message right now.');
      return;
    }

    form.reset();
    setStatusMessage('Thank you! Your message has been received and stored for review by the admin.');
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Have questions or want to collaborate? Send your message and it will be stored in the site database for admin review.
      </p>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
          }}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>

      {statusMessage ? (
        <p style={{ marginTop: '1rem', color: statusMessage.includes('received') ? '#0f766e' : '#b91c1c', fontWeight: 500 }}>
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}