import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';

export const Home = () => {
    const [articles, setArticles] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        let dataUrl = `http://localhost:8000/articles`;

        if (categoryId) dataUrl = `http://localhost:8000/articles/categories/${categoryId}`;

        axios
            .get(dataUrl)
            .then((res) => setArticles(res.data))
            .catch((err) => console.log(err));
    }, [categoryId]);

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    {articles.map((article) => (
                        <div className='col-md-3 col-sm-6 col-12 g-3'>
                            <Card article={article} key={`article-${article.id}`} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
