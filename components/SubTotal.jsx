import React from 'react';
import { Card } from 'react-bootstrap';

function SubTotal(props) {
    let subtotal =0
    return (
        <Card className='mt-4'>
        <Card.Body>
            <Card.Title>Cart Total</Card.Title>
            <hr />

            <div className="d-flex justify-content-between mb-2">
                <span>SubTotal:</span>
                <span>${subtotal}</span>
            </div>
            <hr />

            <div className="d-flex justify-content-between mb-2">
                <span>Shipping Cost:</span>
                <span>$5.00</span>
            </div>
            <hr />

            <div className="d-flex justify-content-between mb-2">
                <span>Total:</span>
                <span>${(subtotal + 5.00)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
                <span>Round Off:</span>
                <span>${(subtotal + 5.00).toFixed(0)}</span>
            </div>
            <hr />


        </Card.Body>
    </Card>
    );
}

export default SubTotal;