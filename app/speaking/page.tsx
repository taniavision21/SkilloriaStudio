const featureVideos = [
  {
    title: 'Convocation Speech – Guest Speaker at Algonquin College',
    url: 'https://www.youtube.com/embed/VIDEO_ID_1',
    description:
      'This feature highlights a keynote-style convocation speech delivered as a guest speaker at Algonquin College, sharing inspiration, leadership, and practical learning insights with graduates and their families.',
  },
  {
    title: 'Workshop – AI Agents in Real Life at CDI',
    url: 'https://youtu.be/FYzsl3Z4djA',
    description:
      'A practical workshop delivered at CDI, focused on how AI agents can be applied in real-world contexts, with examples that bridge technology, productivity, and business transformation.',
  },
];

export default function SpeakingPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <section style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>Speaking Engagements & Corporate Training</h1>
        <p style={{ maxWidth: '820px', color: '#555', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Skilloria Studio is invited to speak, inspire, and train across Canada and around the globe.
          From university and college keynote appearances to hands-on corporate workshops, we help organisations
          and learners connect ideas with practical outcomes.
        </p>
        <p style={{ maxWidth: '820px', color: '#555', fontSize: '1.1rem' }}>
          Our engagements are designed to empower teams, strengthen digital skills, and bring real-world AI knowledge
          into professional settings. Whether it is a graduation stage, a conference, or an internal corporate learning session,
          Skilloria Studio delivers clarity, confidence, and action-oriented insight.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {featureVideos.map((video) => (
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
