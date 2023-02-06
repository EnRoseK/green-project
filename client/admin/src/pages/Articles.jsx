import { PostList } from '../components/Blogs/PostList';
import { Heading } from '../components/Heading';
import { DynamicModal } from '../components/utils/DynamicModal';
import { PostCreate } from '../components/Blogs/PostCreate';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PostEdit } from '../components/Blogs/PostEdit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/articles`)
            .then((res) => {
                setArticles(res.data);
            })
            .catch((err) => {
                toast.error(`Алдаа гарлаа`);
            });
    }, []);

    const navigateToEdit = (id) => {
        navigate(`/articles/edit/${id}`);
    };

    return (
        <>
            <div className='container-sm body-container'>
                <Heading
                    title='Blog posts'
                    handleShow={() => {
                        navigate('/articles/create');
                    }}
                />
                <PostList articles={articles} onEdit={navigateToEdit} />
            </div>
        </>
    );
};
