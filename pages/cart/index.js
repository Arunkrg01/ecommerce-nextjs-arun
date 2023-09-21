import Layout from '@/components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { Container, Breadcrumb, Button, Row, Col } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';
import { deleteUserCartById, getUserCartById } from '@/services/user';
import { parse } from 'cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const CartItems = dynamic(() => import('../../components/CartItems'), {
    loading: () => <div>Loading...</div>,
});
const AddAddress = dynamic(() => import('../../components/AddAddress'), {
    loading: () => <div>Loading...</div>,
});
const SubTotal = dynamic(() => import('../../components/SubTotal'), {
    loading: () => <div>Loading...</div>,
});

function Cart(props) {
    const [cartItem, setCartItem] = useState(props.cartData)
    const [jwtData, setJwtData] = useState()
    const [userData, setUserData] = useState()
    console.log("userData...", userData)
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }


    const callDelete = (id) => {
        deleteUserCartById(id, jwtData).then(res => {
            if (res.status === 204) {
                toast.success("Item has been deleted from the cart", {
                    position: toast.POSITION.TOP_RIGHT
                })
                getUserCartById(userData._id, jwtData).then(res => setCartItem(res)).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const jwtToken = localStorage.getItem('jwtToken');
            const userInfo = localStorage.getItem('userinfo');
            console.log(jwtToken, userInfo)
            if (jwtToken && userInfo) {
                setJwtData(jwtToken);
                setUserData(JSON.parse(userInfo))
            }
        }
    }, []);

    return (
        <Layout>
            <Container className='mt-3'>
                <Breadcrumb className='mt-2'>
                    <Breadcrumb.Item active>
                        <House />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Cart
                    </Breadcrumb.Item>
                </Breadcrumb>

                <CartItems cartItem={cartItem} callDelete={callDelete} />

                <Row>
                    <Col lg={6} md={6} sm={12} className="mb-4">
                        <AddAddress />
                    </Col>
                    <Col lg={6} md={6} sm={12} className="mb-4 mt-4">
                        <SubTotal />
                    </Col>
                </Row>

                <div className="text-center mt-4">
                    <Button variant="info" style={{ backgroundColor: '#1daaa3', color: 'white' }} className="w-100">
                        PROCEED TO CHECKOUT
                    </Button>
                </div>

                <ToastContainer />
            </Container>
        </Layout>
    );
}

export default Cart;

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const jwtToken = cookies.jwtToken;
    const userInfo = JSON.parse(cookies.userinfo)
    try {
        const cartData = await getUserCartById(userInfo._id, jwtToken);
        return {
            props: {
                cartData
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                cartData: [],
            },
        };
    }
}