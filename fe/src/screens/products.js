import React from 'react';
import { useNavigate } from 'react-router-dom';

function Products(props) {
    const navigate = useNavigate();

    const viewDetails = () => {
        navigate(`/products/${props.product.productName}`, { state: { data: props.product } });
    };

    return (
        <div>
            <div className="card" onClick={() => { viewDetails() }}>
                <img src={props.product.productImg} alt="Red dress" className="card-img-top" style={{ height: '200px' }} />
                <h3 className="card-title text-center">{props.product.productName}</h3>
                <h3 className="card-title text-center">₹{props.product.productPrice}</h3>
                <p className="card-body">{props.product.productDescription}</p>
                <button id="prod-btn" className="btn mb-2">
                    <i className="fa-solid fa-eye"></i> View Product
                </button>
            </div>
        </div>
    );
}

export default Products;
