import Link from 'next/link';

export default function PriceTrackerComingSoon() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>💸 Labubu Price Tracker</h1>
      <p>Track Labubu resale values over time across different platforms.</p>
      <EmailForm subject="Price Tracker Signup" />
      <BackLink />
    </div>
  );
}

function EmailForm({ subject }) {
  return (
    <form
      action="https://formsubmit.co/daniel.boettcher89@gmail.com"
      method="POST"
      style={{ marginTop: '2rem' }}
    >
      <input type="hidden" name="_next" value="https://labubu-wiki.app/thanks" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value={subject} />

      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        style={{
          padding: '0.5rem',
          width: '250px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <br /><br />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Notify Me
      </button>
    </form>
  );
}

function BackLink() {
  return (
    <p style={{ marginTop: '2rem' }}>
      <Link href="/">← Back to Home</Link>
    </p>
  );
}
