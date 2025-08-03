import Layout from '@/components/Layout';
import Image from 'next/image';
import labubuLimited from '@/public/images/labubu-limited.jpg';

export default function Limited() {
  return (
    <Layout>
      <h1>Limited Edition Labubu – Halloween</h1>
      <figure>
        <Image src={labubuLimited} alt="Halloween Labubu Figure" width={400} />
        <figcaption>The spooky limited-edition Halloween Labubu.</figcaption>
      </figure>
      <section>
        <h2>Overview</h2>
        <p>
          The Halloween Labubu is a rare and seasonal release that captures
          the spirit of October. With glowing eyes and a trickster’s charm,
          it&apos;s a standout in any collection.
        </p>
      </section>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Height: ~10 cm</li>
          <li>Material: Vinyl</li>
          <li>Color Scheme: Black, orange, and green</li>
        </ul>
      </section>
    </Layout>
  );
}
