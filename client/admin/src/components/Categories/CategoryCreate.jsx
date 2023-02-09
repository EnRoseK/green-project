import axios from 'axios';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CategoryCreate = ({ afterSubmit }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const submit = () => {
    axios
      .post(`http://localhost:8000/categories`, { title, description })
      .then((res) => {
        toast.success(`Амжилттай нэмэгдлээ`);
        afterSubmit(res.data);
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
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type='text'
          ref={titleInputRef}
          placeholder='Name of the category...'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          as={`textarea`}
          rows={3}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};
