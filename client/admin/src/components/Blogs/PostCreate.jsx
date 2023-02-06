import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export const PostCreate = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/categories`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    const submit = () => {
        axios
            .post(`http://localhost:8000/articles`, {
                title: name,
                imageUrl,
                categoryId: Number(categoryId),
                description,
                text,
            })
            .then((res) => {
                toast.success(`Амжилттай нэмэгдлээ`);
                navigate('/articles');
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) navigate('/signout');

                console.log(err);
                toast.error(`Алдаа гарлаа`);
            });
    };

    return (
        <div className='container-sm body-container py-4'>
            <h2 className='mb-3'>Create Article</h2>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name of the post...'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Image location'
                        value={imageUrl}
                        onChange={(e) => {
                            setImageUrl(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(e.target.value);
                        }}
                    >
                        <option>Select Category</option>
                        {categories.map((category, index) => {
                            return (
                                <option value={category.id} key={`category-${index}`}>
                                    {category.title}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Text</Form.Label>
                    <ReactQuill theme='snow' value={text} onChange={setText} />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};
