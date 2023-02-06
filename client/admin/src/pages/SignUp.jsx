import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TOAST_CONFIG } from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [capitalLetter, setCapitalLetter] = useState(false);
    const [lowerLetter, setLowerLetter] = useState(false);
    const [number, setNumber] = useState(false);
    const [special, setSpecial] = useState(false);
    const [length, setLength] = useState(false);

    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperLetters = lowerLetters.toUpperCase();
    const numbers = '0123456789';
    const specials = '@$!%*#?&.~';

    const checkLowerLetters = (pass) => {
        let result = false;
        for (let letter of lowerLetters) {
            if (pass.includes(letter)) {
                result = true;
                break;
            }
        }

        return result;
    };

    const checkUpperLetters = (pass) => {
        let result = false;
        for (let letter of upperLetters) {
            if (pass.includes(letter)) {
                result = true;
                break;
            }
        }

        return result;
    };

    const checkNumbers = (pass) => {
        let result = false;
        for (let letter of numbers) {
            if (pass.includes(letter)) {
                result = true;
                break;
            }
        }

        return result;
    };

    const checkSpecials = (pass) => {
        let result = false;
        for (let letter of specials) {
            if (pass.includes(letter)) {
                result = true;
                break;
            }
        }

        return result;
    };

    const navigate = useNavigate();

    const submitSignup = () => {
        if (capitalLetter && lowerLetter && number && special && length) {
            axios
                .post(`http://localhost:8000/signup`, { email, password, repassword })
                .then((res) => {
                    toast.success(res.data.message, TOAST_CONFIG);
                    setTimeout(() => {
                        navigate('/signin');
                    }, 1000);
                })
                .catch((err) => toast.error(err.response.data.message, TOAST_CONFIG));
        } else {
            toast.error('Нууц үг шаардлага хангахгүй байна');
        }
    };

    return (
        <div className='w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column'>
            <div className='col-sm-4'>
                <div className='card'>
                    <div className='card-body'>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitSignup();
                            }}
                        >
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    type='email'
                                    placeholder='Enter email'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (checkUpperLetters(e.target.value)) setCapitalLetter(true);
                                        else setCapitalLetter(false);

                                        if (checkLowerLetters(e.target.value)) setLowerLetter(true);
                                        else setLowerLetter(false);

                                        if (checkNumbers(e.target.value)) setNumber(true);
                                        else setNumber(false);

                                        if (checkSpecials(e.target.value)) setSpecial(true);
                                        else setSpecial(false);

                                        if (e.target.value.length > 8) setLength(true);
                                        else setLength(false);
                                    }}
                                    type='password'
                                    placeholder='Password'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password repeat</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password repeat'
                                    value={repassword}
                                    onChange={(e) => setRepassword(e.target.value)}
                                />
                            </Form.Group>

                            <ul style={{ fontSize: 14 }}>
                                <li style={{ color: capitalLetter ? 'green' : 'inherit' }}>
                                    Must contain Capital letters
                                </li>
                                <li style={{ color: lowerLetter ? 'green' : 'inherit' }}>Must contain lower letters</li>
                                <li style={{ color: number ? 'green' : 'inherit' }}>Must contain numbers</li>
                                <li style={{ color: special ? 'green' : 'inherit' }}>
                                    Must contain special character (@$!%*#?&.~)
                                </li>
                                <li style={{ color: length ? 'green' : 'inherit' }}>Must be more than 8 characters</li>
                            </ul>

                            <div className='d-flex justify-content-end'>
                                <Link to={'/signin'}>
                                    <Button variant='outline-success' type='button' className='me-3'>
                                        Sign in
                                    </Button>
                                </Link>
                                <Button variant='primary' type='submit'>
                                    Sign up
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
