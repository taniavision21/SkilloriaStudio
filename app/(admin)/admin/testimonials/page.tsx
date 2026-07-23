'use client';

import { useEffect, useState } from 'react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Array<{ id: number; name: string; course: string; testimonial: string; created_at: string }>>([]);
  const [contacts, setContacts] = useState<Array<{ id: number; name: string; email: string; message: string; status: string; created_at: string }>>([]);
  const [statusMessage, setStatusMessage] = useState('');

  async function loadPendingTestimonials() {
    const response = await fetch('/api/testimonials?status=pending');
    const data = await response.json();
    setTestimonials(data.submissions || []);
  }

  async function loadContacts() {
    const response = await fetch('/api/contact/list');
    const data = await response.json();
    setContacts(data.submissions || []);
  }

  function refreshDashboard() {
    loadPendingTestimonials();
    loadContacts();
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  async function handleApprove(id: number) {
    const response = await fetch('/api/testimonials/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(result.error || 'Unable to approve testimonial.');
      return;
    }

    setStatusMessage('Testimonial approved successfully.');
    refreshDashboard();
  }

  async function handleApproveContact(id: number) {
    const response = await fetch(`/api/contact/${id}/approve`, {
      method: 'POST',
    });

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(result.error || 'Unable to approve contact query.');
      return;
    }

    setStatusMessage('Contact query marked as approved.');
    refreshDashboard();
  }

  async function handleDeleteContact(id: number) {
    const response = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      setStatusMessage(result.error || 'Unable to delete contact query.');
      return;
    }

    setStatusMessage('Contact query deleted successfully.');
    refreshDashboard();
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '1200px' }}>
      <section style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Admin Dashboard</h1>
        <p style={{ color: '#555', maxWidth: '760px' }}>
          Review pending testimonials and contact submissions collected from the public site.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
          <p style={{ color: '#555', fontSize: '0.95rem' }}>Pending Testimonials</p>
          <h2 style={{ fontSize: '2rem' }}>{testimonials.length}</h2>
        </div>
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
          <p style={{ color: '#555', fontSize: '0.95rem' }}>Contact Queries</p>
          <h2 style={{ fontSize: '2rem' }}>{contacts.length}</h2>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        }}
      >
        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Pending Testimonials</h2>
          {testimonials.length === 0 ? (
            <p style={{ color: '#555' }}>No pending testimonial submissions are waiting for approval.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {testimonials.map((item) => (
                <article key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem' }}>
                  <p style={{ color: '#777', marginBottom: '0.4rem' }}>
                    <strong>{item.name}</strong> • {item.course} • {new Date(item.created_at).toLocaleString()}
                  </p>
                  <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>{item.testimonial}</p>
                  <button type="button" className="btn-primary" onClick={() => handleApprove(item.id)}>
                    Approve Testimonial
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Contact Queries</h2>
          {contacts.length === 0 ? (
            <p style={{ color: '#555' }}>No contact queries have been submitted yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {contacts.map((item) => (
                <article key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem' }}>
                  <p style={{ color: '#777', marginBottom: '0.4rem' }}>
                    <strong>{item.name}</strong> • {item.email} • {new Date(item.created_at).toLocaleString()}
                  </p>
                  <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>{item.message}</p>
                  <p style={{ color: '#555', marginBottom: '1rem' }}>Status: {item.status === 'approved' ? 'Approved' : 'New'}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-primary" onClick={() => handleApproveContact(item.id)}>
                      Approve
                    </button>
                    <button type="button" className="btn-primary" onClick={() => handleDeleteContact(item.id)} style={{ background: '#b91c1c' }}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {statusMessage ? (
        <p style={{ marginTop: '1rem', color: '#0f766e', fontWeight: 500 }}>{statusMessage}</p>
      ) : null}
    </div>
  );
}
