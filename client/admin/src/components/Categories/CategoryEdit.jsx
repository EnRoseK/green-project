import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export const CategoryEdit = ({ id, afterEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/categories/${id}`)
            .then((res) => {
                setName(res.data.title);
                setDescription(res.data.description);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const submit = () => {
        axios
            .patch(`http://localhost:8000/categories/${id}`, { title: name, description })
            .then((res) => {
                toast.success(`Амжилттай шинэчиллээ`);
                afterEdit(res.data);
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) navigate('/signout');

                console.log(err);
                toast.error(`Алдаа гарлаа`);
            });
    };

    return (
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
                    placeholder='Name of the category...'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as={`textarea`}
                    rows={3}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Save Changes
            </Button>
        </Form>
    );
};
