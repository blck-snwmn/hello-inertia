import { Head, Link } from "@inertiajs/react";

type AboutProps = {
  title: string;
  stack: string[];
};

export default function About({ title, stack }: AboutProps) {
  return (
    <main className="page">
      <Head title={title} />

      <nav className="nav">
        <Link href="/" className="navLink">
          Home
        </Link>
        <Link href="/about" className="navLink active">
          About
        </Link>
      </nav>

      <section className="panel">
        <p className="eyebrow">Inertia page</p>
        <h1>{title}</h1>
        <p className="lead">
          Hono のルートが Inertia の page object を返し、React がページコンポーネントとして描画します。
        </p>
        <ul className="stackList">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href="/" className="button secondary">
          Home に戻る
        </Link>
      </section>
    </main>
  );
}
