import '../styles/Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import Swal from 'sweetalert2';
import Products from '../screens/products';

function Slider() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();  // Fetch products when the component mounts
    });

    // Function to fetch products from the server
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/`);
            if (response.status === 200) {
                setProducts(response.data);  // Set the fetched products to state
            }
            else {
                // Display error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Some error occured",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Some error occured",
            });
        }
    };

    // Divide fetched products into different carousels
    const carousel1Products = products.slice(0, 4);
    const carousel2Products = products.slice(4, 8);
    const carousel3Products = products.slice(8, 12);

    return (
        <div className="Slider">
            <div className="mb-0" id="carousel-container">
                {/* Display the heading for the featured products */}
                <h2 className="text-center mb-3 feature-text" id="carousel-heading">Featured Products</h2>
                <div id="carouselIndicators" className="carousel slide">
                    {/* Carousel indicators */}
                    <ol className="carousel-indicators direction-sign">
                        <li data-target="#carouselIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        {/* First carousel item */}
                        <div className="carousel-item active">
                            <div className="row card-row slider-row">
                                {carousel1Products.map((product) => (
                                    <div className="col-md-3 col-12" key={product._id}>
                                        <Products
                                            product={product}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Second carousel item */}
                        <div className="carousel-item">
                            <div className="row card-row slider-row">
                                {/* Map through carousel2Products */}
                                {carousel2Products.map((product) => (
                                    <div className="col-md-3 col-12" key={product._id}>
                                        <Products
                                            product={product}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Third carousel item */}
                        <div className="carousel-item">
                            <div className="row card-row slider-row">
                                {/* Map through carousel3Products */}
                                {carousel3Products.map((product) => (
                                    <div className="col-md-3 col-12" key={product._id}>
                                        <Products
                                            product={product}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    {/* Carousel control buttons */}
                    <a className="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon direction-sign" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon direction-sign" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Slider;  
