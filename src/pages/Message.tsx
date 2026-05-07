import { Head, Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";

type MessageProps = {
  title: string;
  message: string;
  updateCount: number;
  updatedAt: string | null;
};

function formatUpdatedAt(updatedAt: string | null) {
  if (!updatedAt) {
    return "未更新";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "medium"
  }).format(new Date(updatedAt));
}

export default function Message({ title, message, updateCount, updatedAt }: MessageProps) {
  const { data, setData, post, processing } = useForm({
    message: ""
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post("/message");
  }

  return (
    <main className="page">
      <Head title={title} />

      <nav className="nav">
        <Link href="/" className="navLink">
          Home
        </Link>
        <Link href="/about" className="navLink">
          About
        </Link>
        <Link href="/message" className="navLink active">
          Message
        </Link>
      </nav>

      <section className="panel">
        <p className="eyebrow">Update example</p>
        <h1>{title}</h1>
        <p className="lead">POST でサーバ側の値を更新し、リダイレクト後の props で画面を再描画します。</p>

        <section className="savedMessage" aria-labelledby="saved-message-heading">
          <p className="sectionLabel" id="saved-message-heading">
            保存済みメッセージ
          </p>
          <p className="savedMessageText">{message}</p>
          <dl className="metaList">
            <div>
              <dt>更新回数</dt>
              <dd>{updateCount}</dd>
            </div>
            <div>
              <dt>最終更新</dt>
              <dd>{formatUpdatedAt(updatedAt)}</dd>
            </div>
          </dl>
        </section>

        <form className="messageForm" onSubmit={submit}>
          <label className="fieldLabel" htmlFor="message">
            新しいメッセージ
          </label>
          <textarea
            id="message"
            className="messageInput"
            name="message"
            rows={4}
            value={data.message}
            onChange={(event) => setData("message", event.target.value)}
          />
          <button className="button" disabled={processing} type="submit">
            {processing ? "更新中..." : "メッセージを更新"}
          </button>
        </form>
      </section>
    </main>
  );
}
