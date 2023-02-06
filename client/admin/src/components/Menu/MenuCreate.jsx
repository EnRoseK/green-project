import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const MenuCreate = ({ afterSubmit, positionId }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('#');
  const [newTab, setNewTab] = useState(false);
  const [ordering, setOrdering] = useState(0);

  const submit = () => {
    axios
      .post(`http://localhost:8000/menus?positionId=${positionId}`, { name, link, newTab, ordering: Number(ordering) })
      .then((res) => {
        toast.success('Амжилттай нэмэгдлээ');
        afterSubmit(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Алдаа гарлаа');
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type='text'
          placeholder='Name of the menu...'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Link</Form.Label>
        <Form.Control
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          type='text'
          placeholder='Link of the menu...'
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Order</Form.Label>
        <Form.Control
          value={ordering}
          onChange={(e) => {
            setOrdering(e.target.value);
          }}
          type='number'
          placeholder='Order of the menu...'
        />
      </Form.Group>
      <Form.Group className='mb-3 d-flex'>
        <Form.Label className='me-3'>Open in new tab</Form.Label>
        <Form.Check type='switch' onChange={() => setNewTab(!newTab)} value={newTab} />
        <Form.Label>{newTab ? 'Yes' : 'No'}</Form.Label>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};
