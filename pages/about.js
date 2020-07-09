import Router from 'next/router';
import { MainLayout } from '../components/MainLayout';

export default function About({ data }) {
  const linkClickHandler = () => {
    Router.push('/');
  }

  return <MainLayout>
    <h1>{data.title}</h1>
    <button onClick={linkClickHandler}>Go home</button>
  </MainLayout>
}

About.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4200/about`);
  const data = await response.json();

  return {
    data: data
  }
}
