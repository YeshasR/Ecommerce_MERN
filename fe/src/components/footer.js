import React from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="Footer">
            <div className="container ">
                <div className="footer-row row">
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-4">
                        <h5 className="text-uppercase">
                            <Link to="/women" className="text-white">
                                Women
                            </Link>
                        </h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <Link to="/dresses" className="text-white">
                                    Dresses
                                </Link>
                            </li>
                            <li>
                                <Link to="/pants" className="text-white">
                                    Pants
                                </Link>
                            </li>
                            <li>
                                <Link to="/skirts" className="text-white">
                                    Skirts
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-4">
                        <h5 className="text-uppercase">
                            <Link to="/men" className="text-white">
                                Men
                            </Link>
                        </h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <Link to="/shirts" className="text-white">
                                    Shirts
                                </Link>
                            </li>
                            <li>
                                <Link to="/trousers" className="text-white">
                                    Trousers
                                </Link>
                            </li>
                            <li>
                                <Link to="/hoodies" className="text-white">
                                    Hoodies
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-4">
                        <h5 className="text-uppercase">
                            <Link to="/kids" className="text-white">
                                Kids
                            </Link>
                        </h5>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0 mt-4">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <Link to="/" className="text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-white">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-row row">
                    <hr className="mb-4 mt-4" />
                    <p>Copyright &copy; Yesh-commerce 2023-24</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
