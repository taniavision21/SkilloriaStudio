'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const navLinks = [
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/skilloria-logo.png"
              alt="Skilloria Studio Logo"
              width={180}
              height={56}
              priority
            />
          </Link>

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburger} />
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}