import Layout from '@/components/Layout';
import Image from 'next/image';
import labubuCocaCola from '@/public/images/labubu-collab.jpg';

export default function Collabs() {
  return (
    <Layout>
      <h1>Labubu Collaboration – Coca-Cola Edition</h1>
      <figure>
        <Image src={labubuCocaCola} alt="Labubu Coca-Cola Collab Figure" width={400} />
        <figcaption>The exclusive Labubu x Coca-Cola collectible figure.</figcaption>
      </figure>
      <section>
        <h2>Overview</h2>
        <p>
          This special edition Labubu was released in collaboration with Coca-Cola,
          combining Labubu’s playful charm with the iconic branding of Coca-Cola.
          It’s a must-have for collectors and fans of both brands.
        </p>
      </section>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Height: ~10 cm</li>
          <li>Material: Vinyl</li>
          <li>Color Scheme: Red, white, and black</li>
          <li>Released: 2022</li>
          <li>Limited edition run</li>
        </ul>
      </section>
    </Layout>
  );
}
