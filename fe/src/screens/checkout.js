import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Swal from 'sweetalert2';
import '../styles/Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const total = location.state?.total;
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState('');

    const goToCart = () => {
        navigate('/cart');
    };

    const placeOrderHandle = () => {
        Swal.fire({
            title: 'Place Order?',
            text: 'Are you sure you want to place this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Place Order',
            cancelButtonText: 'No, Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Place order logic
                Swal.fire('Order Placed!', 'Your order has been placed successfully!', 'success');
            }
        });
    };

    useEffect(() => {
        // Load data logic
    }, []);

    return (
        <div>
            <Header />
            <div className='checkout-container pt-3 pb-3'>
                <div className='checkout-card '>
                    <div className='checkout-address p-3'>
                        <h1>Shipping Address</h1>
                        {edit ? (
                            <input
                                className='address-input'
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        ) : (
                            <div className='address-display'>{address}</div>
                        )}
                        <button
                            className={`edit-save-button ${edit ? 'save' : 'edit'}`}
                            onClick={() => setEdit(!edit)}
                        >
                            {edit ? 'Save' : 'Edit'}
                        </button>
                        <p className='note-text'>
                            Note: The address change is for this order only!
                        </p>
                        <button className='go-to-cart-button' onClick={goToCart}>
                            Go to Cart
                        </button>
                    </div>
                    <div className='checkout-summary pt-5'>
                        <h2 className='summary-title'>Order Summary</h2>
                        <div className='total-amount'>Total Amount: ₹{total}</div>
                        <button className='place-order-button' onClick={placeOrderHandle}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Checkout;
