'use client';

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Have questions or want to collaborate? Send your message and it will open in your email app for delivery to the Skilloria Studio inbox.
      </p>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const name = encodeURIComponent(String(formData.get('name') || ''));
          const email = encodeURIComponent(String(formData.get('email') || ''));
          const message = encodeURIComponent(String(formData.get('message') || ''));

          window.location.href = `mailto:taniavision21@gmail.com?subject=${encodeURIComponent('Contact from Skilloria Studio website')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        }}
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
    </div>
  );
}