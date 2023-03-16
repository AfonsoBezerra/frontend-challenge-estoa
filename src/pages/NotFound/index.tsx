import { Background } from 'components/Background';
import { Link } from 'react-router-dom';

export const NotFount = () => (
  <main className="px-4 overflow-hidden">
    <section className="max-desk relative flex flex-col h-screen items-center justify-center">
      <h1 className="text-9xl max-[400px]:text-7xl font-sans-secondary">404</h1>
      <p className="text-xl font-sans-secondary text-zinc-600">
        Hi, say &rdquo;hey&ldquo; for Bob and goodbye!
      </p>
      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold transition-colors py-2 px-8 rounded-md w-fit self-center mt-10"
      >
        Go to home
      </Link>
    </section>

    <div
      style={{
        top: `${Math.floor(Math.random() * 70 + 10)}vh`,
        left: `${Math.floor(Math.random() * 70 + 10)}vw`,
      }}
      className="opacity-0 absolute hover:opacity-100 w-12 h-12"
    >
      <img src="/images/bob.jpg" alt="This is Bob. Say Hi for he." />
    </div>

    <Background />
  </main>
);
