import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
import { Roboto } from 'next/font/google'
import Head from 'next/head';
import PrivateRoute from '@/components/PrivateRoute';
import { useEffect, useState } from 'react';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {


  return (
    <main className={roboto.className}>
      <PrivateRoute>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      </PrivateRoute>
    </main>
  )
}
