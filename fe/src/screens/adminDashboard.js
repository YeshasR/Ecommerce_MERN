import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import adminPic from '../assests/adminlogo.png';
import { BASE_URL } from '../config';
import '../styles/adminDashboard.css';

function AdminDashboard() {
    const [product, setProduct] = useState({
        img: { preview: '', data: '' },
        name: '',
        price: '',
        description: '',
        gender: '',
        category: '',
        stocks: '',
    });

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const authHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        setProduct((prevProduct) => ({ ...prevProduct, img: { preview: URL.createObjectURL(selectedFile), data: selectedFile } }));
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', product.img.data);
        const response = await axios.post(`${BASE_URL}/uploadFile`, formData);
        return response.data.fileName;
    };


    const addProduct = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const uploadedFileName = await uploadImage();
            const requestData = {
                productImg: `${BASE_URL}/files/${uploadedFileName}`,
                productName: product.name,
                productPrice: product.price,
                productDescription: product.description,
                gender: product.gender,
                category: product.category,
                stocks: product.stocks,
            };

            const response = await axios.post(`${BASE_URL}/addProduct`, requestData, authHeader);

            if (response.status === 201) {
                Swal.fire({ icon: 'success', title: 'Product Added Successfully', text: response.data.message });
                resetForm();
            } else {
                Swal.fire({ icon: 'error', title: 'Oops...', text: response.data.message });
            }
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: error.response?.data?.error || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProduct({
            img: { preview: '', data: '' },
            name: '',
            price: '',
            description: '',
            gender: '',
            category: '',
            stocks: '',
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/myProducts`, authHeader);

                if (response.status === 200) {
                    setProducts(response.data.product);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header />
            <div className="admin-panel-container">
                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <h1>Admin</h1>
                        <img src={adminPic} alt="Admin Profile" className="admin-pic" />
                        <h4>Admin Details</h4>
                    </div>
                    <div className="admin-details">
                        <p>Name: {JSON.parse(localStorage.getItem('user')).firstName} {JSON.parse(localStorage.getItem('user')).lastName}</p>
                        <p>Phone: {JSON.parse(localStorage.getItem('user')).phone}</p>
                        <p>Email: {JSON.parse(localStorage.getItem('user')).email}</p>
                        <p>{products.length} Products</p>
                    </div>
                    <div className="admin-actions">
                        <NavLink to={'/edit-product'}>
                            <button className="admin-btn">Edit Products</button>
                        </NavLink>
                        <NavLink to={'/edit-product'}>
                            <button className="admin-btn">Manage Orders</button>
                        </NavLink>
                    </div>
                </div>
                <div className="product-panel">
                    <h1>Add Product</h1>
                    <form onSubmit={addProduct}>
                        <div className="form-group">
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control-file"
                                onChange={handleFileSelect}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product Name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product Price (in ₹)"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                placeholder="Product Description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={product.gender}
                                onChange={(e) => setProduct({ ...product, gender: e.target.value })}
                            >
                                <option value="">Choose a Gender</option>
                                <option value="women">Women</option>
                                <option value="men">Men</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                {product.gender === 'women' ? (
                                    <>
                                        <option value="">Choose a category</option>
                                        <option value="dresses">Dresses</option>
                                        <option value="pants">Pants</option>
                                        <option value="skirts">Skirts</option>
                                    </>
                                ) : product.gender === 'men' ? (
                                    <>
                                        <option value="">Choose a category</option>
                                        <option value="shirts">Shirts</option>
                                        <option value="trousers">Trousers</option>
                                        <option value="hoodies">Hoodies</option>
                                    </>
                                ) : product.gender === 'kids' ? (
                                    <>
                                        <option value="">Choose a category</option>
                                        <option value="kids">Kids</option>
                                    </>
                                ) : (
                                    <option value="">Choose a gender first</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Stocks"
                                value={product.stocks}
                                onChange={(e) => setProduct({ ...product, stocks: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            {loading ? (
                                <div className="loading-spinner">
                                    <div className="spinner-border text-secondary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <button type="submit" className="admin-btn">
                                    Add Product
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminDashboard;
