import { Link } from 'react-router-dom';

export const Card = ({ article }) => {
    return (
        <div className='card'>
            <div className='card-img'>
                <Link to={`/articles/${article.id}`}>
                    <img src={article.imageUrl} alt={article.title} />
                </Link>
            </div>
            <div className='card-body'>
                <Link to={`/articles/${article.id}`}>{article.title ? article.title : article.name}</Link>
            </div>
        </div>
    );
};
