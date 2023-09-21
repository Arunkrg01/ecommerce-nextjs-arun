import React from 'react';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google'

const roboto = Playfair_Display({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})


const HomeCategoryCard = (props) => {
    return (
        <Card style={{ backgroundColor: '#f5f4f2', textAlign: "center", alignItems: "center", position: "relative" }}>
            <Image src={props.image} alt="Product Image" width={250} height={250}  loading="lazy" />
            <div style={{ position: "absolute", right: "0", textAlign: "right",paddingRight:"0.4rem" }}>
                <h4 className={roboto.className}>{props.name}</h4>
                <p className={roboto.className} style={{color:"red"}}>{props.deal}</p>
            </div>
        </Card>
    );
};

export default HomeCategoryCard;
