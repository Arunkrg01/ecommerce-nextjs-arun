import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Montserrat } from 'next/font/google'
import { getFeaturedProduct } from '@/services/products';

import dynamic from 'next/dynamic';
import Loading from '@/pages/loading';
const HomeProductCard = dynamic(() => import('./HomeProductCard'), {
    loading: () => <div>Loading...</div>,
});


const roboto = Montserrat({
    weight: ['100'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})


function Features() {
    const [product, setProduct] = useState([])
    useEffect(() => {
        getFeaturedProduct().then(res => setProduct(res)).catch(err => console.log(err))
    }, []);
    return (
        <>
            <Row>
                <Col>
                    <div className="feature-text">
                        <div className="left-line"></div>
                        <span className={roboto.className}>FEATURED PRODUCTS</span>
                        <div className="right-line"></div>
                    </div>
                </Col>
            </Row>
            <Container>
                <Row>
                    {
                         product.length === 0 ?  <Loading/> : 
                        product.map((e,i) => (
                            <Col key={i} sm={8} lg={4} md={4} className='mt-2 mb-2'>
                                <HomeProductCard data={e} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    );
}

export default Features;


