import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import userPic from '../assests/adminlogo.png';
import { BASE_URL } from '../config';
import '../styles/Profile.css'

function Profile() {
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
        if (userData === null || (userType !== 'user' && userType !== 'admin')) {
            navigate('/login');
        }
        if (userType === 'user') {
            dispatch({ type: 'usersuccessLogin', payload: userData });
        } else if (userType === 'admin') {
            dispatch({ type: 'adminsuccessLogin', payload: userData });
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

    useEffect(() => {
        loadData();
        fetchOrders();
    });


    return (
        <div className="profile-page">
            <Header />
            <div className="profile-content">
                <div className="user-panel">
                    <img src={userPic} alt="User Profile" className="user-pic" />
                    <div className="user-details">
                        <h1 className="detail-title">User Details</h1>
                        <div className="detail">Name: {userData.firstName} {userData.lastName}</div>
                        <div className="detail">Phone: {userData.phone}</div>
                        <div className="detail">Email: {userData.email}</div>
                        <div className="detail">Orders: {orders.length}</div>
                    </div>
                </div>
                <div className="orders-panel">
                    <h1 className="orders-title">Orders</h1>
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div className={`order ${index % 2 === 0 ? 'delivered' : 'pending'}`} key={index}>
                                <div className="order-number">Order {index + 1}</div>
                                <div className="product-name">{order.product.productName}</div>
                                <div className="order-status">{index % 2 === 0 ? 'Delivered' : 'Pending'}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;