import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { Montserrat, Nanum_Gothic_Coding } from 'next/font/google';
import { useRouter } from 'next/router';
import photo from '../public/images/shirt.png';
import photo1 from '../public/images/bag.png';
import photo2 from '../public/images/pant.png';
import photo3 from '../public/images/phone.png';
import photo4 from '../public/images/laptop.png';
import photo5 from '../public/images/shirt1.png';
import { addToCart } from '@/services/products';
import { ToastContainer, toast } from 'react-toastify';

const roboto = Montserrat({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});
const productClass = Nanum_Gothic_Coding({
    weight: ['700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});

function ProductDetail(props) {
    const { product } = props
    console.log("product...", product)
    const [quantity, setQuantity] = useState(1);
    const [leftImageIndex, setLeftImageIndex] = useState(0);
    const [rightImageIndex, setRightImageIndex] = useState(0);
    const visibleImages = 3;
    const maxStars = 3;
    const roundedRating = Math.round(0);
    const router = useRouter();
    const currentRoute = router.asPath.split('/')[3];
    console.log(currentRoute)
    const [userData, setUserData] = useState()
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [errorMsg, setErrorMsg] = useState("")

    const handleColor = (color) => {
        setSelectedColor(color);
    };


    const handleSize = (size) => {
        setSelectedSize(size);
    };





    const productImages = [
        photo,
        photo1,
        photo2,
        photo3,
        photo4,
        photo5,
        photo4,
        photo3,
        photo2,
        photo1,
        photo
    ];


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('userinfo');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, []);

    const changeLeftImage = (direction) => {
        if (direction === 'next') {
            setLeftImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
        } else if (direction === 'prev') {
            setLeftImageIndex((prevIndex) =>
                prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
            );
        }
    };

    const changeRightImage = (index) => {
        setRightImageIndex(index);
    };

    const renderImages = () => {
        const startIndex = leftImageIndex;
        const endIndex = (startIndex + visibleImages - 1) % productImages.length;

        if (startIndex <= endIndex) {
            return productImages.slice(startIndex, endIndex + 1);
        } else {
            return [...productImages.slice(startIndex), ...productImages.slice(0, endIndex + 1)];
        }
    };
    const handleAddToCart = () => {
        if (product.category === "shirt" || product.category === "pant") {
            if (selectedSize === null) {
                toast.error("Please select the Size", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            else if (selectedColor === null) {
                toast.error("Please select the Color", {
                    position: toast.POSITION.TOP_RIGHT
                })
            } else if (selectedSize != null && selectedColor != null) {
                console.log("all good for api")
                const data = {
                    "user": userData._id,
                    "product": currentRoute,
                    "quantity": quantity,
                    "size": selectedSize,
                    "color": selectedColor

                }
                addToCart(data).then(res => {
                    if (res.status === 201) {
                        toast.success("Item has been added into the cart", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        router.push('/cart')
                    }
                }).catch(err => console.log(err))
            }

        } else {
            if (selectedColor === null) {
                toast.error("Please select the Color", {
                    position: toast.POSITION.TOP_RIGHT
                })
            } else if (selectedColor != null) {
                console.log("APi CALL")
                const data = {
                    "user": userData._id,
                    "product": currentRoute,
                    "quantity": quantity,
                    "size": "no",
                    "color": selectedColor

                }
                addToCart(data).then(res => {
                    if (res.status === 201) {
                        toast.success("Item has been added into the cart", {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        router.push('/cart')
                    }
                }).catch(err => console.log(err))

            }
        }
        // let size
        // if(selectedSize === null){
        //     size = "no"
        // }else{
        //     size =  selectedSize
        // }
        // const data = {
        //     "user": userData._id,     // Replace with the actual user ID
        //     "product": currentRoute, // Replace with the actual product ID
        //     "quantity": quantity,
        //     "size" : size,
        //     "color":selectedColor

        //   }
        //   addToCart(data).then(res=>{
        //     if(res.status === 201){
        //         router.push('/cart')
        //     }
        //   }).catch(err=>console.log(err))

    }
    return (
        <Row style={{ marginBottom: "2rem" }}>
            <Col lg={2} md={3} sm={4} xs={4} className="col-lg-20 col-md-20 col-sm-40 col-xs-40 pt-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderImages().map((img, idx) => (
                    <div key={idx} onClick={() => changeRightImage(leftImageIndex + idx)}>
                        <Image src={img} alt={`Product ${idx + 1}`} width={100} height={100} />
                    </div>
                ))}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Button style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', marginRight: '8px' }} onClick={() => changeLeftImage('prev')}>
                        &#8593;
                    </Button>
                    <Button style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }} onClick={() => changeLeftImage('next')}>
                        &#8595;
                    </Button>
                </div>
            </Col>



            <Col lg={4} md={4} sm={8} xs={8} className="col-lg-40 col-md-40 col-sm-60 col-xs-60 pt-3">
                <div className="bg-contain" style={{ backgroundColor: '#f5f4f2' }}>
                    <Image src={productImages[rightImageIndex]} alt="Product"
                        layout="responsive" // Use responsive layout
                        loading="lazy" // Lazy load the image
                    />
                </div>
            </Col>
            <Col lg={6} md={6} sm={12} className="col-lg-40 col-md-40 col-sm-100 pt-3">
                <h2 className={productClass.className}>{product.name}</h2>
                <div className="star-rating">
                    {Array.from({ length: maxStars }, (_, index) => (
                        <span key={index} className={`star ${index < roundedRating ? 'filled' : ''}`}>&#9733;</span>
                    ))}
                </div>


                <p className={roboto.className}>{product.description}</p>
                <div style={{ display: "flex" }}>
                    <p style={{ textDecoration: 'line-through', color: "grey" }} className={roboto.className}>${product.price}</p>
                    <p style={{ paddingLeft: "1rem", color: "lightblue" }} className={roboto.className}>${product.price}</p>
                </div>
                <div >
                    {
                        (product.category === "shirt" || product.category === "pant") &&

                        <ButtonGroup aria-label="Size Options">
                            {product.size.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? 'primary' : 'outline-secondary'}
                                    style={{ margin: '5px' }}
                                    onClick={() => handleSize(size)}
                                    active={selectedSize === size}
                                >
                                    {size}
                                </Button>
                            ))}
                        </ButtonGroup>
                    }
                    <div style={{ display: 'flex', margin: '0.5rem' }}>
                        {product.color.map((color) => (
                            <a
                                key={color}
                                className={`circular-button ${selectedColor === color ? 'selected' : ''}`}
                                style={{ backgroundColor: color.toLowerCase() }}
                                onClick={() => handleColor(color)}
                            ></a>
                        ))}
                    </div>
                </div>
                <div className="quantity-control d-flex align-items-center mb-4 mt-4">
                    <Button
                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
                        onClick={() => setQuantity(quantity - 1)}
                    >
                        -
                    </Button>
                    <p className="mx-3">{quantity}</p>
                    <Button
                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </Button>
                </div>

                <Button variant="outline-dark" onClick={handleAddToCart}>Add To Cart</Button>

            </Col>
            <ToastContainer />
        </Row>
    );
}

export default ProductDetail;