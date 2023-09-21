import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import shirt1 from '../public/images/shirt1.png'
import shirt2 from '../public/images/shirt2.png'
import Image from 'next/image';
import { Dawning_of_a_New_Day } from 'next/font/google'

const roboto = Dawning_of_a_New_Day({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
  })

function CarouselCard() {
  return (
    <Container fluid>
      <Carousel>
        <Carousel.Item style={{ backgroundColor: '#f5f4f2' }}>
          <Row className="d-flex align-items-center mx-0">
            <Col md={6} className="text-left p-4">
              <h2>Fresh Arrival</h2>
              <h1 className={roboto.className}>You can have anything you want in life if you dress for it.</h1>
            </Col>
            <Col md={6}>
              <Image
                src={shirt1}
                alt="Carousel Image 1"
                className="img-fluid"
                loading="lazy" 
                layout="responsive"
              />
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item style={{ backgroundColor: '#f5f4f2' }}>
          <Row className="d-flex align-items-center mx-0">
            <Col md={6} className="text-left p-4">
              <h2>Fresh Arrival</h2>
              <h1 className={roboto.className}>You can have anything you want in life if you dress for it.</h1>
            </Col>
            <Col md={6}>
              <Image
                src={shirt2}
                alt="Carousel Image 1"
                className="img-fluid"
                loading="lazy"
                layout="responsive"
              />
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default CarouselCard;
