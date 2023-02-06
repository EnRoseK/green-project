import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignInSuccess = ({ setMe }) => {
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .post(`http://localhost:8000/users/me`)
            .then((res) => {
                setMe(res.data);
                localStorage.setItem('me', JSON.stringify(res.data));
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data.message);
                navigate('/signin');
            });

        let status = 200;
    }, []);

    return <div className='w-100 m-vh-100 d-flex align-items-center justify-content-center'></div>;
};
