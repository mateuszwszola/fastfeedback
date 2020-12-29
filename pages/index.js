import Head from 'next/head';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { user, signInWithGithub, signOut } = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fast Feedback</h1>
        {user ? (
          <button onClick={(e) => signOut()}>Sign Out</button>
        ) : (
          <button onClick={(e) => signInWithGithub()}>Login With GitHub</button>
        )}

        <p>{user?.email}</p>
      </main>

      <footer></footer>
    </div>
  );
}
