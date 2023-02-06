import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { TOAST_CONFIG } from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitSingIn = () => {
        axios
            .post(`http://localhost:8000/signin`, { email, password })
            .then((res) => {
                toast.success(res.data.message, TOAST_CONFIG);
                localStorage.setItem('token', res.data.body);
                navigate('/signin/success');
            })
            .catch((err) => toast.error(err.response.data.message, TOAST_CONFIG));
    };

    return (
        <div className='w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column'>
            <div className='col-sm-4'>
                <div className='card'>
                    <div className='card-body'>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitSingIn();
                            }}
                        >
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={email}
                                    type='email'
                                    placeholder='Enter email'
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-end'>
                                <Link to={'/signup'}>
                                    <Button variant='outline-success' type='button' className='me-3'>
                                        Sign up
                                    </Button>
                                </Link>
                                <Button variant='primary' type='submit'>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
