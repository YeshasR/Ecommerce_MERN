import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Logo from '../assests/contactus.jpg';
import '../styles/Contact.css';

function Contact() {
    return (
        <div className="contact-page">
            <Header />
            <div className='container text-center mt-4 mb-4'>
                <h1 className="contact-heading">Contact Us<i className="fas fa-phone-volume"></i></h1>
                <div className="row">
                    <div className="col-md-6 order-md-2">
                        <div className="contact-form">
                            <h2 className="form-heading">Send us a message</h2>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Name" />
                                    <label htmlFor="floatingName">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingEmail" placeholder="Email" />
                                    <label htmlFor="floatingEmail">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="floatingMessage" placeholder="Message" rows="4"></textarea>
                                    <label htmlFor="floatingMessage">Message</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <img className='contact-img' src={Logo} alt="Contact us" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
