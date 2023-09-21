import Layout from '@/components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getProductByID, getProductReviewByID } from '@/services/products';
import { parse } from 'cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Suspense } from 'react'
import Loading from '@/pages/loading';


const UserReview = dynamic(() => import('../../../components/UserComment'), {
    loading: () => <div>Loading...</div>,
});
const ProductDetail = dynamic(() => import('../../../components/ProductDetail'), {
    loading: () => <div>Loading...</div>,
});

const ProductDetails = (props) => {
    const router = useRouter();
    let product = props.productData
    const [userReview, setUserReview] = useState(props.productReview)
    const [jwtData, setJwtData] = useState()
    const currentRoute = router.asPath.split('/')[3];

    const commentCall = () => {
        getProductReviewByID(currentRoute, jwtData).then(res => setUserReview(res)).catch(err => console.log(err))
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('jwtToken');
            if (storedUserData) {
                setJwtData(storedUserData);
            }
        }
    }, []);

    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <Container className="mt-3">
                    <ProductDetail product={product} />
                    <UserReview data={userReview} commentCall={commentCall} />
                </Container>
            </Suspense>
        </Layout>

    );
};

export default ProductDetails;


export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const jwtToken = cookies.jwtToken;
    const pid = context.params.id;
    try {
        const productData = await getProductByID(pid, jwtToken);
        const productReview = await getProductReviewByID(pid, jwtToken)
        return {
            props: {
                productData,
                productReview
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                productData: [],
            },
        };
    }
}