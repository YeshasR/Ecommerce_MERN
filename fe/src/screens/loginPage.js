import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../config';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('null');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerHandle = () => {
        navigate('/signup');
    };

    const login = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/${userType}-login`, { email, password });

            if (response.status === 200) {
                const { token, userType, userInfo } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('userType', userType.role);
                localStorage.setItem('user', JSON.stringify(userInfo));

                if (userType === 'user') {
                    dispatch({ type: 'usersuccessLogin', payload: userInfo });
                    navigate('/');
                } else if (userType === 'admin') {
                    dispatch({ type: 'adminsuccessLogin', payload: userInfo });
                    navigate('/dashboard/admin');
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'An error occurred while logging in.',
            });
        }

        setLoading(false);
    };

    return (
        <div>
            <Header />
            <div className='login-container'>
                <h1 className='login-heading'>Login</h1>
                <form className='login-form' onSubmit={login}>
                    <select className='login-select' value={userType} onChange={(ev) => setUserType(ev.target.value)}>
                        <option value="null">Select an option to login</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    {userType !== 'null' && (
                        <div className='login-fields'>
                            <h2>{userType === 'user' ? 'User Login' : 'Admin Login'}</h2>
                            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email address" />
                            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" />

                            {loading ? (
                                <div className="spinner-border" role="status"></div>
                            ) : (
                                <button type='submit' className='login-button'>Login</button>
                            )}
                        </div>
                    )}

                    {!loading && userType !== 'null' && (
                        <div className='login-register'>
                            <p>Not {userType === 'user' ? 'a User' : 'an Admin'}? <span onClick={registerHandle}>Register here!</span></p>
                        </div>
                    )}
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
