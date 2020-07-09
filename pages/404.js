import Router from 'next/router';
import { MainLayout } from '../components/MainLayout';
import classes from '../styles/error.module.css';

export default function ErrorPage() {
  return <MainLayout>
    <h1 className={classes.error}>404</h1>
    <p>Page not found</p>
    <button onClick={() => {Router.push('/')}}>Go home</button>
  </MainLayout>
}
