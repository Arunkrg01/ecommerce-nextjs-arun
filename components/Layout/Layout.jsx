"use client"

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';



function Layout(props) {
    return (
        <>
           <Header/>
           <main className='main-child'>{props.children}</main>  
           <Footer/>
        </>
    );
}

export default Layout;