'use client'
import React from 'react';
import { Container } from 'react-bootstrap';
import { Suspense } from 'react'

import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout';
import Loading from './loading';
const Features = dynamic(() => import('../components/Features'), {
  loading: () => <Loading />,
});
const Trending = dynamic(() => import('../components/Trending'), {
  loading: () => <Loading />,
});
const HomeCategory = dynamic(() => import('../components/HomeCategory'), {
  loading: () => <Loading />,
});

const CarouselCard = dynamic(() => import('../components/Carousel'), {
  loading: () => <Loading />,
});





function HomePage() {


  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <CarouselCard />
        <Container>
          <Features />
          <Trending />
          <HomeCategory />
        </Container>
      </Suspense>
    </Layout>
  );
}

export default HomePage;
