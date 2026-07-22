import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <section style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          Welcome to <span style={{ color: '#2b6cb0' }}>Skilloria</span> Studio
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#555', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Practical teaching, real skills. We design courses that bridge theory and practice.
        </p>
        <Link href="/about" className="btn-primary">
          Learn More
        </Link>
      </section>

      <section
        style={{
          marginTop: '4rem',
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <h3>📘 Practical Workshops</h3>
          <p>Hands‑on sessions for real‑world applications.</p>
        </div>
        <div
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <h3>🧑‍🏫 One‑on‑One Mentoring</h3>
          <p>Personalised guidance to accelerate your learning.</p>
        </div>
        <div
          style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <h3>📚 Course Design</h3>
          <p>Custom curricula for corporate and academic needs.</p>
        </div>
      </section>
    </div>
  );
}