import Layout from '@/components/Layout';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Welcome to Labubu World</h1>
        <div className={styles.linkList}>
          <Link href="wiki/classic">🧸 Classic Labubu</Link>
          <Link href="wiki/limited">🎃 Limited Edition Labubu</Link>
          <Link href="wiki/collabs">🥤 Collab Labubu</Link>
        </div>
      </div>
    </Layout>
  );
}
