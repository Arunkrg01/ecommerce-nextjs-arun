"use client"
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import logo from '../../public/images/logo3.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getUserCartById } from '@/services/user';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Logout } from '@mui/icons-material';



const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [cartValue, setCartValue] = useState(0)
  const [jwtToken,setJwtToken] = useState()
  console.log("cartValuecartValuecartValue", cartValue)

  useEffect(() => {
    if (userData) {
      getUserCartById(userData._id,jwtToken).then(res => { setCartValue(res) }).catch(err => console.log(err))
    }
  },[userData])

  useEffect(()=>{
    console.log("header")
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userinfo');
      const token =  localStorage.getItem('jwtToken');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      if(token){
        setJwtToken(token)
      }

    }
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleCart = () => {
    router.push('/cart')
  }



  return (
    <Navbar bg="light" expand="lg" style={{ backgroundColor: 'black', color: 'white', position: 'fixed', width: '100%', zIndex: '100' }}>
      <Container>
        <Navbar.Brand>
          <Image src={logo} alt="logo" width={150} height={50} loading="lazy"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="mx-auto">
            <Link href="/" style={{ textDecoration: "none", color: "black", paddingTop: ".5rem" }}>Home</Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <Link href="/product/all" style={{ textDecoration: "none", color: "black", padding: "0.5rem" }}>All</Link><br></br>
              <Link href="/product/shirt" style={{ textDecoration: "none", color: "black", padding: "0.5rem" }}>Shirt</Link><br></br>
              <Link href="/product/pant" style={{ textDecoration: "none", color: "black", padding: "0.5rem" }}>Pants</Link><br></br>
              <Link href="/product/suit" style={{ textDecoration: "none", color: "black", padding: "0.5rem" }}>Suits</Link><br></br>
              <Link href="/product/saree" style={{ textDecoration: "none", color: "black", padding: "0.5rem" }}>Saree</Link><br></br>
            </NavDropdown>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {
              userData ? <Nav.Link href="#hi-arun">Hi {userData.name}</Nav.Link> :
                <Nav.Link href="/auth">Login / SignUp</Nav.Link>
            }
          </Nav>
          <Nav className="ml-auto">
            <Link href="/cart">
              <Badge badgeContent={cartValue.length} color="warning" sx={{ margin: ".5rem" }}>
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </Link>
            <Badge badgeContent={1} color="warning" sx={{ margin: ".5rem" }}>
              <FavoriteBorderOutlinedIcon color="action" />
            </Badge>
          </Nav>
          <Link href='/auth' style={{ margin: ".5rem" }}>
            <Logout color="action" />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
