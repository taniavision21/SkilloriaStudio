import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Skilloria Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}