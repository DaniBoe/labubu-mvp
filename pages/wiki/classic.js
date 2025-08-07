import Head from 'next/head';
import Image from 'next/image';
import labubuClassic from '@/public/images/labubu-classic.jpg';

export default function Classic() {
  return (
    <>
      <Head>
        <title>Classic Labubu | Labubu Collection</title>
        <meta name="description" content="Explore the iconic Classic Labubu figure, a favorite among collectors." />
      </Head>

      <h1>Classic Labubu</h1>
      <figure>
        <Image src={labubuClassic} alt="Classic Labubu Figure" width={400} />
        <figcaption>The original Labubu collectible figure.</figcaption>
      </figure>
      <section>
        <h2>Overview</h2>
        <p>
          The Classic Labubu is the most iconic version of the Labubu series,
          first introduced by Kasing Lung and POP MART. It features the mischievous
          expression and unique art style that define the character.
        </p>
      </section>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Height: ~10 cm</li>
          <li>Material: Vinyl</li>
          <li>Color Scheme: Beige, pink, and white</li>
        </ul>
      </section>
    </>
  );
}
