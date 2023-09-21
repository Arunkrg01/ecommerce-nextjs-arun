"use client"

import React from 'react';
import { Facebook, Instagram, Twitch } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white',marginTop:"2rem" }}>
      <Container className="py-4">
        {/* First Section - Social Media Icons */}
        <div className="mb-4 text-center">
          <h5>Follow Us</h5>
          <div>
            <a href="#" className="text-white mx-3">
              <Facebook />
            </a>
            <a href="#" className="text-white mx-3">
              <Twitch />
            </a>
            <a href="#" className="text-white mx-3">
              <Instagram />
            </a>
          </div>
        </div>

        {/* Second Section - Information */}
        <Row className="mb-4">
          <Col md={3}>
            <h5>Our Stories</h5>
            <hr style={{ borderColor: 'white', width: '20%',marginBottom:"2rem" , borderWidth: '4px'}} />
            <ul className="list-unstyled">
              <li>Delhi</li>
              <li>Noida</li>
              <li>Patna</li>
              <li>Bangalore</li>
              <li>Gurugram</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Information</h5>
            <hr style={{ borderColor: 'white', width: '20%',marginBottom:"2rem" , borderWidth: '4px'}} />
            <ul className="list-unstyled">
              <li>About Store</li>
              <li>New Collections</li>
              <li>Women Dress</li>
              <li>Contact Us</li>
              <li>Latest News</li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5>Useful Links</h5>
            <hr style={{ borderColor: 'white', width: '20%',marginBottom:"2rem" , borderWidth: '4px'}} />
            <ul className="list-unstyled">
              <li>Privacy Policy</li>
              <li>Returns</li>
              <li>Terms & Conditions</li>
              <li>Our Sitemap</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>About the Store</h5>
            <hr style={{ borderColor: 'white', width: '20%',marginBottom:"2rem" , borderWidth: '4px'}} />
            <p>
              123 St. Peter Street, Noida, India <br />
              Phone: +1 234 567 890 <br />
              Email: info@example.com
            </p>
          </Col>
        </Row>

        {/* Third Section - Copyright */}
        <hr style={{ borderColor: 'white', margin: '0 auto',marginBottom:"2rem" }} />
        <div className="text-center">
          <p>&copy; 2023 Developed & Designed by Arun ❤️. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
