import { Home } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    label: 'New',
  },
];

export const CategoryCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const showToast = useToast();

  const navigate = useNavigate();

  const resetFields = () => {
    setTitle('');
    setDescription('');
  };

  const createCategory = () => {
    axios
      .post(`http://localhost:8000/categories`, { title, description })
      .then(() => {
        showToast('Category created!', 'success');
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
          Add Category
        </Typography>
        <Box
          component='form'
          onSubmit={(e) => {
            e.preventDefault();
            createCategory();
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
              Create
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
