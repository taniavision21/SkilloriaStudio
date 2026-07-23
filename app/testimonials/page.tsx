'use client';

import { useEffect, useState } from 'react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Array<{ id: number; name: string; course: string; testimonial: string; created_at: string }>>([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    async function loadTestimonials() {
      const response = await fetch('/api/testimonials?status=approved');
      const data = await response.json();
      setTestimonials(data.submissions || []);
    }

    loadTestimonials();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      course: String(formData.get('course') || ''),
      testimonial: String(formData.get('testimonial') || ''),
    };

    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(result.error || 'Unable to submit testimonial right now.');
      return;
    }

    form.reset();
    setStatusMessage('Thank you! Your testimonial has been submitted and is now pending approval.');
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '1100px' }}>
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>Student Testimonials</h1>
        <p style={{ maxWidth: '760px', margin: '0 auto', color: '#555', fontSize: '1.1rem' }}>
          Feedback from learners who have grown through practical workshops, mentoring, and project-based learning experiences.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {testimonials.map((item) => (
          <article
            key={item.id}
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            }}
          >
            <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>“{item.testimonial}”</p>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{item.name}</h3>
            <p style={{ color: '#777' }}>{item.course}</p>
          </article>
        ))}
      </section>

      <section style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Submit Your Testimonial</h2>
        <p style={{ color: '#555', marginBottom: '1rem' }}>
          Share your experience with Skilloria Studio and help inspire future learners. Your submission will be reviewed before appearing publicly.
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
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem' }}
          />
          <input
            type="text"
            name="course"
            placeholder="Course or Program"
            required
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem' }}
          />
          <textarea
            name="testimonial"
            rows={5}
            placeholder="Your testimonial"
            required
            style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem', resize: 'vertical' }}
          />
          <button type="submit" className="btn-primary">
            Submit Testimonial
          </button>
        </form>

        {statusMessage ? (
          <p style={{ marginTop: '1rem', color: statusMessage.includes('submitted') ? '#0f766e' : '#b91c1c', fontWeight: 500 }}>
            {statusMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
}
