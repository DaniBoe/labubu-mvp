import Link from 'next/link';
import Head from 'next/head';

export default function FakeCheckerComingSoon() {
  return (
    <>
      <Head>
        <title>Fake Labubu Checker — Spot a Fake Labubu Figure | Coming Soon</title>
        <meta
          name="description"
          content="Wondering if your Labubu figure is real or fake? Our Fake Labubu Checker helps you spot counterfeit figures. Sign up now to be notified when it launches!"
        />
      </Head>

      <div style={styles.container}>
        <h1>🔍 Fake Labubu Checker — How to Spot a Fake Labubu Figure</h1>
        <p>
          Concerned about Labubu authenticity? Our tool will help you identify fake Labubu collectibles quickly and easily.
        </p>
        <EmailForm subject="Fake Checker Signup" />
        <BackLink />
      </div>
    </>
  );
}

function EmailForm({ subject }) {
  return (
    <form
      action="https://formsubmit.co/daniel.boettcher89@gmail.com"
      method="POST"
      style={styles.form}
    >
      <input type="hidden" name="_next" value="https://labubu-wiki.app/thanks" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value={subject} />

      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        style={styles.input}
        aria-label="Email address"
      />
      <br /><br />
      <button type="submit" style={styles.button}>Notify Me</button>
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

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '4rem',
  },
  form: {
    marginTop: '2rem',
  },
  input: {
    padding: '0.5rem',
    width: '250px',
    borderRadius: '4px',
    border: '1px solid #ccc', // <-- fix this quote if copy-pasting
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
