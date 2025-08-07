import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Labubu World</h1>
      <div className={styles.linkList}>
        <Link href="wiki/classic">🧸 Classic Labubu</Link>
        <Link href="wiki/limited">🎃 Limited Edition Labubu</Link>
        <Link href="wiki/collabs">🥤 Collab Labubu</Link>
      </div>

      {/* --- Coming Soon Email Form with FormSubmit & Tool Selector --- */}
      <section style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>🧪 Coming Soon: Labubu Tools</h2>
        <p>We are building new tools for serious collectors:</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '1.8em' }}>
          <li>🔍 Fake Checker – verify if your Labubu is real</li>
          <li>📈 Price & Rarity Tracker – see current market value</li>
          <li>🛍️ Restock Alerts – get notified when new ones drop</li>
        </ul>
        <p>Sign up to be the first to access these tools 👇</p>

        <form
          action="https://formsubmit.co/daniel.boettcher89@gmail.com"
          method="POST"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
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

          <select
            name="preferred_tool"
            required
            defaultValue=""
            style={{
              padding: '0.5rem',
              width: '260px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="" disabled>
              Select the tool you're most excited about
            </option>
            <option value="Fake Checker">🔍 Fake Checker</option>
            <option value="Price Tracker">📈 Price & Rarity Tracker</option>
            <option value="Restock Alerts">🛍️ Restock Alerts</option>
          </select>

          {/* Redirect after submit */}
          <input
            type="hidden"
            name="_next"
            value="https://labubu-wiki.app/thanks"
          />

          {/* Anti-spam honeypot */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          {/* Disable Captcha */}
          <input type="hidden" name="_captcha" value="false" />

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
            Get Early Access
          </button>
        </form>
      </section>
    </div>
  );
}
