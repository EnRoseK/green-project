import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignOut = ({ setMe }) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('me');
        setMe(undefined);
        navigate('/signin');
    }, []);
};
