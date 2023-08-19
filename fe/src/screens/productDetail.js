import React, { useState, useEffect } from 'react'
import '../styles/Detail.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Rating from 'react-rating';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../config';

function Detail() {
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data;
    const [averageRating, setAverageRating] = useState(0)
    const [stocks, setStock] = useState(data.stocks);
    const [added, setAdded] = useState(false);
    const addtocartHandler = async () => {
        try {
            const response = await axios.put(`${BASE_URL}/order`, { productId: data._id }, CONFIG_URL);
            if (response.status === 200) {
                setAdded(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Item added to cart',
                    confirmButtonText: 'Continue Shopping',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add item to cart',
                });
                navigate('/login');
            }
            updateStocks(data._id);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.response.data.title,
                text: error.response.data.message,
                confirmButtonText: 'Continue Shopping',
            });
            navigate('/allproducts');
        }
    };

    const CONFIG_URL = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };

    useEffect(() => {
        setRating(data.rating);
        updateRatings(data._id);
    }, [data.rating, data._id]);


    const handleRatingChange = (value) => {
        setRating(value);
    };

    async function updateRatings(productId) {
        try {
            const refreshedData = await axios.get(`${BASE_URL}/products/${productId}`);
            const updatedProduct = refreshedData.data;
            setStock(updatedProduct.stocks);
            if (updatedProduct.rating.length === 0) {
                setAverageRating(0);
            }
            else {
                const sum = updatedProduct.rating.reduce((acc, item) => acc + item.ratings, 0);
                const average = sum / updatedProduct.rating.length;
                setAverageRating(average.toFixed(1));
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function updateStocks(productId) {
        try {
            const refreshedData = await axios.get(`${BASE_URL}/products/${productId}`);
            const updatedProduct = refreshedData.data;
            setStock(updatedProduct.stocks);
        } catch (error) {
            console.error(error);
        }
    }

    const submitRating = async () => {
        if (localStorage.getItem('userType') !== 'user') {
            return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please login as a user to submit rating',
                })
            )
        }
        else {
            await axios.put(`${BASE_URL}/rate`, { productId: data._id, ratings: rating }, CONFIG_URL)
                .then((response) => {
                    console.log('Rating submitted successfully');
                    Swal.fire('Success', 'Rating submitted successfully', 'success');
                })
                .catch((error) => {
                    console.error('Failed to submit rating:', error);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: error.response.data.error,
                    });
                });
        }
        await updateRatings(data._id);
    };

    return (
        <div>
            <Header />
            <div className='container mb-5'>
                <div className='row mt-5'>
                    <div className='col-6 col-md-6'>
                        <img className='details-pic' src={data.productImg} alt='Dress' />
                    </div>
                    <div className='col-5 col-md-5'>
                        <h1>{data.productName}</h1>
                        <h3>{data.productDescription}</h3>
                        <h2>Price : ₹{data.productPrice}</h2>
                        <hr />
                        <h2>Ratings : {averageRating} <i className="fa-solid fa-star text-primary "></i></h2>
                        <h2>Stocks : {stocks} items remaining</h2>
                        <button id="order-btn" className={`btn mb-2 ${added ? 'disabled' : ''}`} onClick={added ? null : addtocartHandler}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
                <div className='row review-section'>
                    <div className='col-12 col-md-12'>
                        <h4>Rate our Product :
                            <span id='rating' ><Rating emptySymbol='fa fa-star-o fa-lg' fullSymbol='fa fa-star fa-lg' initialRating={rating} onChange={handleRatingChange} /></span>
                            <button className='btn rating-btn' onClick={submitRating}>Submit Rating</button>
                        </h4>
                    </div>
                    <div className='col-12 col-md-12'>
                        <textarea className='form-control' rows='5' placeholder='Write your review here...'></textarea>
                        <button className='btn rating-btn mt-3' onClick={() => console.log('Selected Rating:', rating)}>Submit Review</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Detail