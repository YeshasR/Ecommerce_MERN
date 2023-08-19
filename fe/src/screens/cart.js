import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/header';
import Footer from '../components/footer';
import { BASE_URL } from '../config';
import '../styles/Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const userType = localStorage.getItem('userType');
    const CONFIG_URL = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };

    const loadData = () => {
        if (userType === 'user') {
            dispatch({ type: 'usersuccessLogin', payload: userData });
        } else if (userType === 'admin') {
            dispatch({ type: 'adminsuccessLogin', payload: userData });
        } else {
            navigate('/login');
        }
    };

    const deleteHandler = async (productId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/order/${productId}`, CONFIG_URL);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item deleted successfully',
                    confirmButtonText: 'Continue Shopping',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to delete item',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.response.data.title,
                text: error.response.data.message,
                confirmButtonText: 'Continue Shopping',
            });
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/orders`, CONFIG_URL);
            const { orders } = response.data;
            setOrders(orders);
        } catch (error) {
            console.error(error);
        }
    };

    const getTotalPrice = () => {
        return orders.reduce((total, order) => total + order.product.productPrice, 0);
    };

    const total = getTotalPrice() + 50;

    const checkout = () => {
        navigate('/checkout', { state: { total: total } });
    };

    useEffect(() => {
        loadData();
        fetchOrders();
    }, []);

    return (
        <div className='cartpage'>
            <Header />
            <div className='container mt-4 mb-4 '>
                <div className='cart-container'>
                    <div className='cart-items'>
                        {orders.length === 0 ? (
                            <p className="empty-cart-text">Your cart is empty. Start shopping now!</p>
                        ) : (
                            orders.map((order) => (
                                <div className='cart-item' key={order.product._id}>
                                    <div className='cart-item-image'>
                                        <img src={order.product.productImg} alt='Cart-Dress' />
                                    </div>
                                    <div className='cart-item-details'>
                                        <h4>{order.product.productName}</h4>
                                        <p>Price: ₹{order.product.productPrice}</p>
                                        <p>Quantity: 1</p>
                                        <button className='remove-btn' onClick={() => { deleteHandler(order.product._id) }}>Remove</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='cart-summary'>
                        <h3>Cart Summary</h3>
                        <p>Total Items: {orders.length}</p>
                        <p>Subtotal: ₹{getTotalPrice()}</p>
                        <p>Shipping: ₹50</p>
                        <hr />
                        <p>Total: ₹{total}</p>
                        <button className='checkout-btn' onClick={checkout}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
