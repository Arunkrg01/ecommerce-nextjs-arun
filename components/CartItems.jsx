import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import photo from '../public/images/shirt.png'


function CartItems(props) {
    const { cartItem } = props
    let subtotal = 0;
    const [userData, setUserData] = useState()

    const handleDelete = (id) => {
              props.callDelete(id)
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('userinfo');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, []);

    return (
        <Table className='mt-3 text-center'>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
            cartItem.map((item) => {
                const itemSubtotal = item.product.price * item.quantity;
                subtotal += itemSubtotal;
                return (
                    <tr key={item.id} className="align-middle">
                        <td>
                            <Image
                                src={photo}
                                alt={item.name}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                        </td>
                        <td className="align-middle">{item.product.name}</td>
                        <td className="align-middle">
                            <div class="circular-button-cart d-flex justify-content-center" style={{ backgroundColor: item.color.toLowerCase() }}></div>
                        </td>
                        <td className="align-middle">{item.size}</td>
                        <td className="align-middle">${item.product.price.toFixed(2)}</td>
                        <td className="align-middle">{item.quantity}</td>
                        <td className="align-middle">${(item.product.price * item.quantity).toFixed(2)}</td>
                        <td className="align-middle">
                            <Button
                                variant='danger'
                                onClick={() => handleDelete(item._id)}
                            >
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
    );
}

export default CartItems;