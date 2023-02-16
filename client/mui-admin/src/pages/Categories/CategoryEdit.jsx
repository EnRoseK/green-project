import { Home } from '@mui/icons-material';
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components';
import { useToast } from '../../hooks';

const breadCrumbs = [
  {
    label: '',
    link: '/',
    icon: <Home />,
  },
  {
    label: 'Categories',
    link: '/categories',
  },
  {
    label: 'Edit',
  },
];

export const CategoryEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const showToast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/categories/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  const resetFields = () => {
    setTitle('');
    setDescription('');
  };

  const updateCategory = () => {
    axios
      .patch(`http://localhost:8000/categories/${id}`, { title, description })
      .then(() => {
        showToast(`Category updated!`, 'success');
        setTimeout(() => navigate('/categories'), 1000);
      })
      .catch((err) => showToast(err.response.data));
  };

  return (
    <>
      <BreadCrumbs items={breadCrumbs} />
      <Stack
        sx={{
          mt: 3,
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 0 5px rgba(0,0,0,.1)',
        }}
      >
        <Typography variant='h5' sx={{ mb: 2 }}>
          Edit Category
        </Typography>
        <Box
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            updateCategory();
          }}
        >
          <TextField
            sx={{ width: '100%', mb: 3 }}
            label='Title'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ width: '100%', mb: 3 }}
            label='Description'
            variant='outlined'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            <Button type='submit' variant='contained'>
              Save
            </Button>
            <Button variant='outlined' onClick={resetFields}>
              Reset
            </Button>
            <Button variant='outlined' onClick={() => navigate('/categories')}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
