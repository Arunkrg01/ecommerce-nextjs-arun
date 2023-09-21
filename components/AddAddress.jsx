import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function AddAddress(props) {

    const [addressData, setAddressData] = useState({
        fullName: '',
        email: '',
        phoneNo: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    // Handle form input changes
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData({
            ...addressData,
            [name]: value,
        });
    };
    const handleAddressSubmit = (e) => {
        e.preventDefault();
        console.log('Address data submitted:', addressData);
    };

    return (
        <div className="mt-4">
        <h3>Add Address</h3>
        <Form onSubmit={handleAddressSubmit}>
            <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    name="fullName"
                    value={addressData.fullName}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={addressData.email}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="phoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="tel"
                    name="phoneNo"
                    value={addressData.phoneNo}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={addressData.address}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                    type="text"
                    name="state"
                    value={addressData.state}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                    type="text"
                    name="pincode"
                    value={addressData.pincode}
                    onChange={handleAddressChange}
                    required
                />
            </Form.Group>
        </Form>
    </div>
    );
}

export default AddAddress;