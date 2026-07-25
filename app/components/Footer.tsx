import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/tutorials', 'Tutorials'],
  ['/capstone-projects', 'Capstone Projects'],
  ['/speaking', 'Speaking'],
  ['/workshops', 'Workshops'],
  ['/mentoring', 'Mentoring'],
  ['/course-design', 'Course Design'],
  ['/testimonials', 'Testimonials'],
  ['/contact', 'Contact'],
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav className={styles.links} aria-label="Footer navigation">
          {footerLinks.map(([href, label]) => (
            <Link key={href} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </nav>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Skilloria Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}