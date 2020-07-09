import Link from 'next/link';
import Head from 'next/head';
import { MainLayout } from '../components/MainLayout';

export default function Index() {
  return <MainLayout title={'Home Page'}>
    <Head>
      <meta name="keywords" content="next,javascript" />
    </Head>
    <h1>Hello Next.JS!</h1>
    <Link href="/about"><a>Go to about page</a></Link>
  </MainLayout>
}
