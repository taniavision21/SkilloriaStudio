'use client';

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Have questions or want to collaborate? Drop us a message.
      </p>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={(e) => {
          e.preventDefault();
          alert('Message sent! (This is a demo)');
        }}
      >
        <input
          type="text"
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
    </div>
  );
}