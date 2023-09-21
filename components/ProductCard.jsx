import React from 'react';
import { Card, Container, Button, ButtonGroup } from 'react-bootstrap';
import imageUrl from '../public/images/shirt1.png';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';



const roboto = Montserrat({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

const ProductCard = (props) => {

    return (
        <>
            <Card style={{ backgroundColor: '#f5f4f2', textAlign: 'center', alignItems: 'center' }}>
                <Image src={imageUrl} alt="Product Image" 
                    layout="responsive" // Use responsive layout
                    loading="lazy" // Lazy load the image
                />
            </Card>
            <Container>
                <h5 style={{ paddingBottom: '1rem', paddingTop: '1rem' }} className={roboto.className}>
                    {props.data.name}
                </h5>
                <p className={roboto.className}>{props.data.description}</p>
                <div style={{ display: "flex" }}>
                    <p style={{ textDecoration: 'line-through', color: "grey" }} className={roboto.className}>${props.data.price}</p>
                    <p style={{ paddingLeft: "1rem", color: "lightblue" }} className={roboto.className}>${props.data.price}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    {
                        (props.data.category === "shirt" || props.data.category === "pant") ?
                            <ButtonGroup aria-label="Size Options">
                                {
                                    props.data.size.map(e => (
                                        <Button variant="outline-secondary" style={{ margin: '5px' }}>{e}</Button>
                                    ))
                                }

                            </ButtonGroup> :
                            <Button variant="outline-secondary" style={{ margin: '5px' }}>Default</Button>
                    }
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {
                            props.data.color.map(e => (
                                <a href="#" class="circular-button" style={{ backgroundColor: e.toLowerCase() }}></a>
                            ))
                        }
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-around", paddingTop: '1rem' }}>
                    <Button className='view-details-button' variant="outline-info" ><Link href={`/product/details/${props.data._id}`} style={{textDecoration:"none",color:"#0dcaf0"}}>VIEW DETAILS</Link></Button>
                </div>
            </Container>
        </>
    );
};

export default ProductCard;
