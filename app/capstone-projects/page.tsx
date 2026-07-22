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
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>AI Applied Capstone Projects</h1>
        <p style={{ maxWidth: '750px', margin: '0 auto', color: '#555', fontSize: '1.1rem' }}>
          Three student capstone projects completed under supervision, demonstrating practical AI applications and creative problem solving.
        </p>
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
