import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/articles/${id}`)
            .then((res) => setArticle(res.data))
            .catch((err) => console.log(err));
    }, []);

    if (!article) return <></>;

    return (
        <div className='container d-flex flex-column align-items-center'>
            <h1>{article.title}</h1>
            <img src={article.imageUrl} alt={article.name} style={{ maxWidth: '50vw' }} />
            <p>{article.text}</p>
        </div>
    );
};
