import { Head, Link } from "@inertiajs/react";

type HomeProps = {
  title: string;
  message: string;
};

export default function Home({ title, message }: HomeProps) {
  return (
    <main className="page">
      <Head title="Home" />

      <nav className="nav">
        <Link href="/" className="navLink active">
          Home
        </Link>
        <Link href="/about" className="navLink">
          About
        </Link>
      </nav>

      <section className="panel">
        <p className="eyebrow">Bun runtime</p>
        <h1>{title}</h1>
        <p className="lead">{message}</p>
        <Link href="/about" className="button">
          スタックを見る
        </Link>
      </section>
    </main>
  );
}
