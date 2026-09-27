import Link from 'next/link';

const capstoneVideos = [
  {
    title: 'AI Applied Capstone Project 1',
    url: 'https://www.youtube.com/embed/C3LOmclDxv8',
    description: 'A student-led AI capstone project showcasing applied machine learning concepts and practical problem solving.',
  },
  {
    title: 'AI Applied Capstone Project 2',
    url: 'https://www.youtube.com/embed/AClUEDtgGs4',
    description: 'A project presentation highlighting real-world AI implementation strategies developed under supervision.',
  },
  {
    title: 'AI Applied Capstone Project 3',
    url: 'https://www.youtube.com/embed/e5vfu7-zAfQ',
    description: 'A completed capstone demo demonstrating the outcomes of guided AI project work by students.',
  },
];

export default function CapstoneProjectsPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>Applied Capstone Projects</h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', color: '#555', fontSize: '1.1rem' }}>
          Practical projects demonstrating applied technology, data analysis, and creative problem solving.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Link href="/capstone-projects/toronto-311" style={{ color: 'inherit', textDecoration: 'none' }}>
          <article
            style={{
              background: '#eef5f1',
              borderLeft: '5px solid #16826c',
              padding: '1.25rem 1.5rem',
            }}
          >
            <p style={{ color: '#467363', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Civic data · Toronto Open Data · 2026
            </p>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>Toronto 311 Service Requests</h2>
            <p style={{ color: '#52605a', maxWidth: '760px' }}>
              Explore request volumes, current status, and ward-level patterns in a civic data dashboard.
            </p>
            <span style={{ color: '#126c5a', display: 'inline-block', fontWeight: 700, marginTop: '0.75rem' }}>
              View dashboard
            </span>
          </article>
        </Link>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {capstoneVideos.map((video) => (
          <article
            key={video.title}
            style={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: '0',
                }}
              />
            </div>
            <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
              <h3 style={{ marginBottom: '0.45rem' }}>{video.title}</h3>
              <p style={{ color: '#555' }}>{video.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
