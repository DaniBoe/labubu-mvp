import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f2f2f2' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link href="/classic" style={{ marginRight: '1rem' }}>Classic</Link>
      <Link href="/collabs" style={{ marginRight: '1rem' }}>Collabs</Link>
      <Link href="/limited" style={{ marginRight: '1rem' }}>Limited</Link>
      <Link href="/tools/fake-checker" style={{ marginRight: '1rem' }}>Fake Checker</Link>
      <Link href="/tools/price-tracker" style={{ marginRight: '1rem' }}>Price Tracker</Link>
      <Link href="/tools/restock-alert" style={{ marginRight: '1rem' }}>Restock Alert</Link>
    </nav>
  );
}
