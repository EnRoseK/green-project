import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useRef } from 'react';

export const PostEdit = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const { id } = useParams();

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();

    axios
      .get(`http://localhost:8000/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

    axios.get(`http://localhost:8000/articles/${id}`).then((res) => {
      setName(res.data.title);
      setImageUrl(res.data.imageUrl);
      setCategoryId(res.data.categoryId);
      setDescription(res.data.description);
      setText(res.data.text);
    });
  }, []);

  const submit = () => {
    axios
      .patch(`http://localhost:8000/articles/${id}`, {
        title: name,
        imageUrl,
        categoryId: Number(categoryId),
        description,
        text,
      })
      .then((res) => {
        toast.success(`Амжилттай хадгаллаа`);
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
      <h2 className='mb-3'>Edit Article</h2>
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
            ref={nameInputRef}
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
            {categories.map((category) => {
              return <option value={category.id}>{category.title}</option>;
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
