import { Brain, Shield, Code2, Database, Cloud, Presentation } from 'lucide-react';

const workshops = [
  {
    icon: <Brain className="w-10 h-10 text-teal-600" />,
    title: 'Artificial Intelligence & Generative AI',
    description:
      'Interactive workshops covering AI fundamentals, ChatGPT, AI agents, prompt engineering, automation, and practical business applications.',
  },
  {
    icon: <Database className="w-10 h-10 text-teal-600" />,
    title: 'Data Science & Machine Learning',
    description:
      'Hands-on sessions in Python, data visualization, predictive analytics, machine learning, and deep learning using real-world datasets.',
  },
  {
    icon: <Shield className="w-10 h-10 text-teal-600" />,
    title: 'Cybersecurity & Linux Administration',
    description:
      'Practical cybersecurity awareness, Linux system administration, shell scripting, networking, and server security workshops.',
  },
  {
    icon: <Code2 className="w-10 h-10 text-teal-600" />,
    title: 'Programming Bootcamps',
    description:
      'Instructor-led bootcamps in Python, Java, C#, JavaScript, SQL, PHP, and full-stack web development.',
  },
  {
    icon: <Cloud className="w-10 h-10 text-teal-600" />,
    title: 'Cloud & DevOps',
    description:
      'Learn Docker, virtualization, cloud fundamentals, Azure, AWS, Git, CI/CD, and deployment best practices.',
  },
  {
    icon: <Presentation className="w-10 h-10 text-teal-600" />,
    title: 'Corporate AI Workshops',
    description:
      'Customized AI awareness sessions and technology upskilling workshops for organizations and educational institutions.',
  },
];

export default function WorkshopsPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '1200px' }}>
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem' }}>Professional Workshops</h1>
        <p style={{ maxWidth: '760px', margin: '0 auto', color: '#555', fontSize: '1.1rem' }}>
          Skilloria Studio delivers practical, hands-on workshops that help students, professionals, and organizations
          turn technology concepts into real-world capability. Every session is designed to be engaging, interactive,
          and aligned with the skills learners need today.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {workshops.map((item, index) => (
          <article
            key={index}
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.5rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '0.8rem' }}>{item.icon}</div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{item.title}</h2>
            <p style={{ color: '#555', lineHeight: 1.7 }}>{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
