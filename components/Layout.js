import Script from 'next/script';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-091V0NEBMX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-091V0NEBMX');
          `,
        }}
      />

      <div style={{ fontFamily: 'Arial', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ background: '#333', padding: '1rem' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
  <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
  <Link href="/wiki/classic" style={{ color: 'white', textDecoration: 'none' }}>Classic</Link>
  <Link href="/wiki/collabs" style={{ color: 'white', textDecoration: 'none' }}>Collabs</Link>
  <Link href="/wiki/limited" style={{ color: 'white', textDecoration: 'none' }}>Limited</Link>
  <Link href="/tools/fake-checker" style={{ color: 'white', textDecoration: 'none' }}>Fake Checker</Link>
  <Link href="/tools/price-tracker" style={{ color: 'white', textDecoration: 'none' }}>Price Tracker</Link>
  <Link href="/tools/restock-alert" style={{ color: 'white', textDecoration: 'none' }}>Restock Alert</Link>
</nav>

        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{ background: '#eee', padding: '1rem', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>© 2025 Labubu World MVP</p>
        </footer>
      </div>
    </>
  );
}
