import React from 'react';
import { Card, Container } from 'react-bootstrap';
import imageUrl from '../public/images//shirt1.png';
import Image from 'next/image';
import { Montserrat } from 'next/font/google'
import Link from 'next/link';

const roboto = Montserrat({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

const HomeProductCard = (props) => {
    console.log("props...",props)
    return (
        <Link href={`/product/details/${props.data._id}`} style={{textDecoration:"none",color:"black"}}>
            <Card style={{ backgroundColor: '#f5f4f2', textAlign: "center", alignItems: "center" }}>
                <Image src={imageUrl} alt="Product Image" width={200} height={250} loading="lazy"/>
            </Card>
            <Container>
                <h5 style={{ paddingBottom: "1rem", paddingTop: "1rem" }} className={roboto.className}>{props.data.name}</h5>
                <p className={roboto.className}>{props.data.description}</p>
                <div style={{ display: "flex" }}>
                    <p style={{ textDecoration: 'line-through', color: "grey" }} className={roboto.className}>${props.data.price}</p>
                    <p style={{ paddingLeft: "1rem", color: "lightblue" }} className={roboto.className}>${props.data.price}</p>
                </div>
            </Container>
        </Link>
    );
};

export default HomeProductCard;
