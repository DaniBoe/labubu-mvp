import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'Arial', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: '#333', padding: '1rem' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link href="/wiki/classic" style={{ color: 'white', textDecoration: 'none' }}>Classic</Link>
          <Link href="/wiki/collabs" style={{ color: 'white', textDecoration: 'none' }}>Collabs</Link>
          <Link href="/wiki/limited" style={{ color: 'white', textDecoration: 'none' }}>Limited</Link>
        </nav>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#eee', padding: '1rem', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>© 2025 Wiki MVP</p>
      </footer>
    </div>
  );
}
