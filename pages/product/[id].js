import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import { getProducts } from '@/services/products';
import { House } from 'react-bootstrap-icons';
import RangeSlider from 'react-bootstrap-range-slider';
import { parse } from 'cookie';
import dynamic from 'next/dynamic';
import { Suspense } from 'react'
import Loading from '../loading';
import Layout from '@/components/Layout/Layout';
import PrivateRoute from '@/components/PrivateRoute';
import { Grid } from '@mui/material';


const ProductCard = dynamic(() => import('../../components/ProductCard'), {
    loading: () => <div>Loading...</div>,
});




function ProductPageCategory(props) {
    const router = useRouter();
    const currentRoute = router.asPath.split('/')[2];
    const [sortOption, setSortOption] = useState('default');
    const [sortOptionColor, setSortOptionColor] = useState('default');
    const [page, setPage] = useState(1)
    const [queryData, setQueryData] = useState()
    const [value, setValue] = React.useState(5000);
    const [productData, setProductData] = useState(props.productData)
    let cookies
    let jwtToken

    if (typeof window !== 'undefined') {
        cookies = parse(document.cookie);
        jwtToken = cookies.jwtToken;
    }




    useEffect(() => {
        let query
        if (currentRoute === "all") {
            if (sortOption !== "default" && sortOptionColor === "default") {
                query = `page=${page}&sort=${sortOption}`;
                setQueryData(query)
            } else if (sortOption === "default" && sortOptionColor !== "default") {
                query = `page=${page}&color=${sortOptionColor}`;
                setQueryData(query)
            } else if (sortOption !== "default" && sortOptionColor !== "default") {
                query = `page=${page}&color=${sortOptionColor}&sort=${sortOption}`;
                setQueryData(query)
            }
        }
        else {
            if (sortOption === "default" && sortOptionColor === "default") {
                query = `page=${page}&category=${currentRoute}`;
                setQueryData(query)
            }
            else if (sortOption !== "default" && sortOptionColor === "default") {
                query = `page=${page}&sort=${sortOption}&category=${currentRoute}`;
                setQueryData(query)
            } else if (sortOption === "default" && sortOptionColor !== "default") {
                query = `page=${page}&color=${sortOptionColor}&category=${currentRoute}`;
                setQueryData(query)
            } else if (sortOption !== "default" && sortOptionColor !== "default") {
                query = `page=${page}&color=${sortOptionColor}&sort=${sortOption}&category=${currentRoute}`;
                setQueryData(query)
            }
        }
        getProducts(query, jwtToken).then(res => setProductData(res)).catch(err => console.log(err))
        console.log("useeffect:query", query)

    }, [router, sortOption, sortOptionColor])

    const handleSortChange = (option) => {
        setSortOption(option)
    }

    const handleColorChange = (option) => {
        setSortOptionColor(option)

    }

    const handleMoreData = () => {

    }


    return (
        <Layout>
            <PrivateRoute isLoggedIn={jwtToken}>
                <Suspense fallback={<Loading />}>
                    <Navbar bg="dark" data-bs-theme="dark" className='mt-2'>
                        <Container>
                            <Nav className="me-auto" >
                                <Nav.Link>All</Nav.Link>
                                <Nav.Link className='nav-li'>Shirt</Nav.Link>
                                <Nav.Link className='nav-li' >Pant</Nav.Link>
                                <Nav.Link className='nav-li' >Saree</Nav.Link>
                                <Nav.Link className='nav-li' >Suit</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <Container>
                        <Breadcrumb className='mt-2'>
                            <Breadcrumb.Item active>
                                <House />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                Product
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>{currentRoute}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Grid container spacing={2} sx={{marginBottom:"1rem"}}>
                            <Grid item xs={6} lg={2} md={2}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <p>Sort:</p>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="sort-dropdown" style={{ backgroundColor: 'white', color: 'black' }}>
                                        {sortOption === 'default' ? 'Default' : sortOption}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={() => handleSortChange('default')}>
                                            Default
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSortChange('lowtohigh')}>
                                            Price: Low to High
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSortChange('hightolow')}>
                                            Price: High to Low
                                        </Dropdown.Item>
                                        {/* Add other sorting options here */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            </Grid>
                            <Grid item xs={6} lg={2} md={2}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <p>Color:</p>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="sort-dropdown" style={{ backgroundColor: 'white', color: 'black' }}>
                                        {sortOptionColor === 'default' ? 'Default' : sortOptionColor}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleColorChange('default')}>
                                            Default
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Red')}>
                                            Red
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Blue')}>
                                            Blue
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Green')}>
                                            Green
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Yellow')}>
                                            Yellow
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Black')}>
                                            Black
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('White')}>
                                            White
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleColorChange('Grey')}>
                                            Grey
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            </Grid>
                            <Grid item xs={6} lg={2} md={2}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <p>Price:</p>
                                <p>0</p>
                                <RangeSlider
                                    min={0}
                                    max={10000}
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                    tooltip='on'
                                />
                                <p>10000</p>
                            </div>
                            </Grid>
                           
                        </Grid>
                    </Container>
                    <Container>
                        <Row>
                            {
                                productData.length === 0 ? "No Data Found" :
                                    productData.map((e, i) => (
                                        <Col key={i} sm={8} lg={4} md={4} className='mt-2 mb-2'>
                                            <ProductCard data={e} />
                                        </Col>
                                    ))
                            }
                        </Row>
                    </Container>
                    <div className="text-center mt-4">
                        <Button variant="outline-dark" onClick={handleMoreData}>Load More Products</Button>
                    </div>
                </Suspense>
            </PrivateRoute>
        </Layout>

    );
}

export default ProductPageCategory;





export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const jwtToken = cookies.jwtToken;
    const category = context.params.id;
    let query
    if (category == "all") {
        query = `page=1`
    }
    else {
        query = `page=1&category=${category}`
    }

    try {
        const productData = await getProducts(query, jwtToken);
        console.log("productData..", productData)
        return {
            props: {
                productData,
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