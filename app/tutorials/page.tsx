const tutorialVideos = [
  {
    title: 'Python Fundamentals',
    url: 'https://www.youtube.com/embed/1TeltnrVi6M',
    description: 'A Python tutorial for beginners, covering the basics of programming and Python syntax.',
  },
  {
    title: 'Skilloria Studio Playlist',
    url: 'https://www.youtube.com/embed/videoseries?list=PLOi5sGCbR0OovIHsHbuQdTvN2B9pTZfLt',
    description: 'Browse a curated collection of Python learning videos designed to help learners build practical skills.',
  },
];

export default function TutorialsPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>Skilloria Studio Tutorials</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#555', fontSize: '1.1rem' }}>
          Explore practical video lessons, walkthroughs, and learning content from our YouTube channel.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {tutorialVideos.map((video) => (
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
