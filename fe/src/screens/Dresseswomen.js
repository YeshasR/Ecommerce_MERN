import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { BASE_URL } from '../config';
import Swal from 'sweetalert2';
import Products from './products';
import Header from '../components/header';
import Footer from '../components/footer';

function WomenDresses() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/women/dresses`, {
          params: {
            page: currentPage,
            perPage: itemsPerPage,
          },
        });

        if (response.status === 200) {
          setProducts(response.data);
          setHasMoreProducts(response.data.length === itemsPerPage);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Some error occurred',
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred',
        });
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="pagecntr">
      <Header />
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Women Dresses</h1>
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Items Per Page:</label>
          <input type="number" id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} />
        </div>
        <div className="grid-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="grid-items mb-4" key={product._id}>
                <Products
                  product={product}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  hasMoreProducts={hasMoreProducts}
                  itemsPerPage={itemsPerPage}
                  handleItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            ))
          ) : (
            <h2 className="text-center no-prod mb-5">Oops...! No more products available</h2>
          )}
        </div>
        <div className="pagination mt-4">
          <button
            className="btn page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            className="btn page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasMoreProducts}
          >
            Next
          </button>
        </div>
      </div>
      {!hasMoreProducts && products.length > 0 && (
        <h2 className="text-center mt-5 mb-5">No more products available</h2>
      )}
      <Footer />
    </div>
  );
}

export default WomenDresses;
