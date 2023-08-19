import React, { useState, useEffect } from 'react';
import '../styles/EditProduct.css';
import { BASE_URL } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedStocks, setUpdatedStocks] = useState('');
  const CONFIG_URL = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const userType = localStorage.getItem('userType');

  const loadData = () => {
    if (userType === 'user') {
      dispatch({ type: 'usersuccessLogin', payload: userData });
    } else if (userType === 'admin') {
      dispatch({ type: 'adminsuccessLogin', payload: userData });
    } else {
      navigate('/login');
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    const product = products[index];
    setUpdatedPrice(product.productPrice);
    setUpdatedStocks(product.stocks);
  };

  const handleSave = async (index) => {
    try {
      const product = products[index];
      const { _id: productId } = product;
      const requestBody = {};
      if (updatedPrice !== '') {
        requestBody.productPrice = updatedPrice;
      }
      if (updatedStocks !== '') {
        requestBody.stocks = updatedStocks;
      }

      if (Object.keys(requestBody).length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No changes to save",
        });
        return;
      }

      const response = await axios.put(`${BASE_URL}/updateProduct/${productId}`, requestBody, CONFIG_URL);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Product updated successfully",
        });
        setEditIndex(null);
        setUpdatedPrice('');
        setUpdatedStocks('');
        getMyProducts();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update product",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error occurred while updating product",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setUpdatedPrice('');
    setUpdatedStocks('');
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteproduct/${productId}`, CONFIG_URL);
      debugger
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
        });
        getMyProducts();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to delete product",
        });
      }
    }
    catch (error) {
      debugger
      Swal.fire({
        icon: "error",
        title: "Error occurred while deleting product",
      });
    }
  };

  const getMyProducts = async () => {
    const response = await axios.get(`${BASE_URL}/myProducts`, CONFIG_URL);
    if (response.status === 200) {
      setProducts(response.data.product);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured",
      });
    }
  };

  useEffect(() => {
    loadData();
    getMyProducts();
  });

  return (
    <div>
      <Header />
      <div className='edit-product-container'>
        <div className='title-row row text-center mt-3 mb-4'>
          <div className='col-1 col-md-1'><h3>S. no.</h3></div>
          <div className='col-2 col-md-2'><h3>Product</h3></div>
          <div className='col-2 col-md-2'><h3>Name</h3></div>
          <div className='col-2 col-md-2'><h3>Price</h3></div>
          <div className='col-1 col-md-1'><h3>Gender</h3></div>
          <div className='col-2 col-md-2'><h3>Category</h3></div>
          <div className='col-1 col-md-1'><h3>Stocks</h3></div>
          <div className='col-1 col-md-1'><h3>=</h3></div>
        </div>
        {products.length === 0 ? (
          <p className="text-center">No products added! Add some products from Dashboard.</p>
        ) : (
          products.map((product, index) => {
            const isEditing = (editIndex === index);
            return (
              <div className='product-row row text-center shadow-lg mb-3' key={index}>
                <div className='col-1 col-md-1'><p>{index + 1}</p></div>
                <div className='col-2 col-md-2'><p><img src={product.productImg} alt='Product' className='prod-pic' /></p></div>
                <div className='col-2 col-md-2'><p>{product.productName}</p></div>
                {isEditing ? (
                  <>
                    <div className='col-2 col-md-2'>
                      <input
                        className='edit-input form-control'
                        type='text'
                        value={updatedPrice}
                        onChange={(e) => setUpdatedPrice(e.target.value)}
                        placeholder='Enter price'
                      />
                    </div>
                    <div className='col-1 col-md-1'><p>{product.gender}</p></div>
                    <div className='col-2 col-md-2'><p>{product.category}</p></div>
                    <div className='col-1 col-md-1'>
                      <input
                        className='edit-input form-control'
                        type='text'
                        value={updatedStocks}
                        onChange={(e) => setUpdatedStocks(e.target.value)}
                        placeholder='Enter stocks'
                      />
                    </div>
                    <div className='col-1 col-md-1'>
                      <button className='editProd-btn btn' onClick={() => handleSave(index)}>Save</button>
                      <button className='editProd-btn btn' onClick={handleCancelEdit}>Cancel</button>
                      <button className='editProd-btn btn' onClick={() => handleDelete(product._id)}>Delete</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='col-2 col-md-2'><p>{product.productPrice}</p></div>
                    <div className='col-1 col-md-1'><p>{product.gender}</p></div>
                    <div className='col-2 col-md-2'><p>{product.category}</p></div>
                    <div className='col-1 col-md-1'><p>{product.stocks}</p></div>
                    <div className='col-1 col-md-1'>
                      <i onClick={() => handleEdit(index)} className="fa-solid fa-pen-to-square"></i>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EditProduct;
