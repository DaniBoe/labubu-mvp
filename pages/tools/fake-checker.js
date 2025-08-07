import Link from 'next/link';
import Head from 'next/head';

export default function FakeCheckerComingSoon() {
  return (
    <>
      <Head>
        <title>Fake Labubu Checker | Coming Soon</title>
        <meta
          name="description"
          content="We're building a tool to verify the authenticity of your Labubu figures. Sign up to be notified when it's ready."
        />
      </Head>

      <div style={styles.container}>
        <h1>🔍 Fake Labubu Checker</h1>
        <p>We are building a tool to help you verify if your Labubu is authentic.</p>
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
    border: '1px solid #ccc',
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
