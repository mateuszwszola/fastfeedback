import Head from 'next/head';
import { useAuth } from '../lib/auth';
import styles from '../styles/Home.module.css';

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fast Feedback</h1>
        {auth.user ? (
          <button onClick={(e) => auth.signOut()}>Sign Out</button>
        ) : (
          <button onClick={(e) => auth.signInWithGithub()}>
            Login With GitHub
          </button>
        )}

        <p>{auth?.user?.email}</p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
