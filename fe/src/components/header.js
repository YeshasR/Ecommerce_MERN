import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import '../styles/header.css';
import Logo from '../assests/logo.png';
import Profile from '../assests/adminlogo.png';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (localStorage.getItem('userType') === 'user') {
            dispatch({ type: 'usererrorLogin' });
        } else if (localStorage.getItem('userType') === 'admin') {
            dispatch({ type: 'adminerrorLogin' });
        }

        localStorage.removeItem('userType');
        navigate('/');
    };

    const renderCartIcon = () => {
        if (localStorage.getItem('userType') === 'user') {
            return (
                <NavLink to={'/cart'} className="logo">
                    <i className="fas fa-shopping-cart cart"></i>
                </NavLink>
            );
        }
        return null;
    };

    const renderProfileDropdown = () => {
        if (localStorage.getItem('token') != null) {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="none" className="custom-toggle">
                        <img
                            className="nav-profile-pic"
                            alt="profile pic"
                            src={Profile}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {localStorage.getItem('userType') === 'admin' ? (
                            <Dropdown.Item>
                                <NavLink
                                    className="text-decoration-none text-dark mt-0"
                                    to="/dashboard/admin"
                                >
                                    My Dashboard
                                </NavLink>
                            </Dropdown.Item>
                        ) : (
                            <Dropdown.Item>
                                <NavLink
                                    className="text-decoration-none text-dark mt-0"
                                    to="/dashboard/user"
                                >
                                    My Profile
                                </NavLink>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        }
        return null;
    };

    return (
        <div className="Heading">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid galaxy ">
                    <NavLink to={'/'} className="navbar-brand mb-0 h1">
                        <span >
                            <img src={Logo} className="navbar-brandimg" alt="Admin Profile Pic" />
                        </span>
                    </NavLink>
                    <button
                        className="navbar-toggler custom-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <form className="d-flex" role="search">
                                    <input
                                        className="form-control"
                                        id="searchbar"
                                        placeholder="Product name Category name.etc."
                                        type="search"
                                        aria-label="Search"
                                    />
                                    <button id="searchbtn" type="submit">
                                        Search
                                    </button>
                                </form>
                            </li>
                        </ul>
                        {localStorage.getItem('token') == null ? (
                            <button className="btn me-4" id="log">
                                <NavLink
                                    to={'/login'}
                                    style={{ color: 'black', textDecoration: 'none' }}
                                >
                                    <b>LOGIN</b>
                                </NavLink>
                            </button>
                        ) : null}
                        {renderCartIcon()}
                        {renderProfileDropdown()}
                    </div>
                </div>
            </nav>
            <ul className="custom-nav nav justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={'/'}>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={'/allproducts'}>
                        All Products
                    </NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        role="button"
                        to={'/'}
                    >
                        Women
                    </NavLink>
                    <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to={'/women'}>
                            All Products
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/dresses'}>
                            Dresses
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/pants'}>
                            Pants
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/skirts'}>
                            Skirts
                        </NavLink>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <NavLink
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        role="button"
                        to={'/'}
                    >
                        Men
                    </NavLink>
                    <div className="dropdown-menu">
                        <NavLink className="dropdown-item" to={'/men'}>
                            All Products
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/shirts'}>
                            Shirts
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/trousers'}>
                            Trousers
                        </NavLink>
                        <NavLink className="dropdown-item" to={'/hoodies'}>
                            Hoodies
                        </NavLink>
                    </div>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={'/kids'}>
                        Kids
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" to={'/contact'}>
                        Contact us
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
