import axios from 'axios';
import { useEffect, useState } from 'react';
import { SlPencil, SlTrash } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListItem = ({ item, index, onEdit, categories }) => {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);

    const deleteArticle = () => {
        axios
            .delete(`http://localhost:8000/articles/${item.id}`)
            .then((res) => {
                toast.success('Амжилттай устгалаа');
                setDeleted(true);
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) navigate('/signout');

                console.log(err);
                toast.error(`Алдаа гарлаа`);
            });
    };

    if (deleted) return <></>;

    return (
        <tr>
            <th scope='row'>{index}</th>
            <td>
                <img src={item.imageUrl} style={{ width: '80%' }} />
            </td>
            <td>{item.title}</td>
            <td>
                {categories.map((category) => {
                    if (category.id === item.categoryId) return category.title;
                })}
            </td>
            <td>{item.description}</td>
            <td style={{ whiteSpace: 'nowrap' }}>
                <button className='btn btn-sm btn-outline-primary me-2' onClick={() => onEdit(item.id)}>
                    <SlPencil />
                </button>
                <button
                    className='btn btn-sm btn-outline-danger'
                    onClick={() => {
                        if (window.confirm(`Устгахдаа итгэлтэй байна уу?`)) deleteArticle();
                    }}
                >
                    <SlTrash />
                </button>
            </td>
        </tr>
    );
};

export const PostList = ({ articles, onEdit }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <table className='table table-bordered table-hover'>
            <thead>
                <tr>
                    <th width='1'>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th width='1'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((item, index) => (
                    <ListItem
                        item={item}
                        index={index + 1}
                        key={`list-item-${index}`}
                        onEdit={onEdit}
                        categories={categories}
                    />
                ))}
            </tbody>
        </table>
    );
};
