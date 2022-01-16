import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

export default function DashboardAdmin() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard CalFit</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>Dashboard</h1>
        <Link href='/admin/classes' passHref>
          <div className={styles.newsdetail}>Admin Classes Access</div>
        </Link>
        <Link href='/admin/newsletters' passHref>
          <div className={styles.newsdetail}>Admin Newsletters Access</div>
        </Link>
        <Link href='/admin/videos' passHref>
          <div className={styles.newsdetail}>Admin Videos Access</div>
        </Link>
        <Link href='/admin/profile' passHref>
          <div className={styles.newsdetail}>Admin Profile Settings</div>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
