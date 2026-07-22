import Link from 'next/link';
import Image from 'next/image';   // 👈 Add this import
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Replace the text inside the Link with the Image */}
        <Link href="/" className={styles.logo}>
          <Image 
            src="/skilloria-logo.png"          // Path to your image in /public
            alt="Skilloria Studio Logo" 
            width={200}              // Adjust width as needed
            height={200}              // Adjust height as needed
            priority                 // Optional: loads faster for LCP
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/capstone-projects">Capstone Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}