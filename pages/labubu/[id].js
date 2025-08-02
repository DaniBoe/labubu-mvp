import Layout from '@/components/Layout';
import Image from 'next/image';
import labubus from '@/data/labubus.json';

export async function getStaticPaths() {
  const paths = labubus.map(l => ({ params: { id: l.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const labubu = labubus.find(l => l.id === params.id);
  return { props: { labubu } };
}

export default function LabubuPage({ labubu }) {
  return (
    <Layout>
      <h1>{labubu.title}</h1>
      <figure>
        <Image src={labubu.image} alt={labubu.title} width={400} height={400} />
        <figcaption>{labubu.description}</figcaption>
      </figure>
      <section>
        <h2>Features</h2>
        <ul>
          {labubu.features.map((feat, i) => <li key={i}>{feat}</li>)}
        </ul>
      </section>
    </Layout>
  );
}
