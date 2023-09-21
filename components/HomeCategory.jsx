import React, {  useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Montserrat } from 'next/font/google';
import bag from '../public/images/bag.png'
import shirt from '../public/images/shirt.png'
import phone from '../public/images/phone.png'
import laptop from '../public/images/laptop.png'
import headphone from '../public/images/headphone1.png'
import pant from '../public/images/pant.png'


import dynamic from 'next/dynamic';

const HomeCategoryCard = dynamic(() => import('./HomeCategoryCard'), {
    loading: () => <div>Loading...</div>,
});


const montserrat = Montserrat({
    weight: ['100'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

function HomeCategory() {
    const categories = [
        { name: 'Mobile', deal: '#HOT DEALS',image:phone },
        { name: 'Laptop', deal: '#MIN 30% OFF',image:laptop },
        { name: 'Headphone', deal: '#FLAT 60%',image:headphone },
        { name: 'Shirts', deal: '#MIN 50% OFF',image:shirt },
        { name: 'Bags', deal: '#FREE SHIPPING',image:bag },
        { name: 'Pants', deal: '#PERFECT FIT',image:pant },
    ];

    return (
        <div>
            <Row>
                <Col>
                    <div className="feature-text">
                        <div className="left-line"></div>
                        <span className={montserrat.className}>CATEGORY PRODUCTS</span>
                        <div className="right-line"></div>
                    </div>
                </Col>
            </Row>
            <Container>
                <Row>
                    {categories.map((category, index) => (
                        <Col sm={8} lg={4} md={4} className='mt-4' key={index}>
                            <HomeCategoryCard name={category.name} deal={category.deal} image={category.image}/>
                        </Col>
                    ))}
                </Row>
             
                    {/* <div className="text-center mt-4">
                      <Button variant="outline-dark">Load More Products</Button>
                    </div> */}
              
            </Container>
        </div>
    );
}

export default HomeCategory;
