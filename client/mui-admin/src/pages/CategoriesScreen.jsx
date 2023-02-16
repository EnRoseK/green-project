import { Delete, Edit, Home } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { BreadCrumbs } from '../components';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../hooks/useDialog';
import { useToast } from '../hooks';

const breadCrumbs = [
  {
    label: '',
    link: '/',
    icon: <Home />,
  },
  {
    label: 'Categories',
  },
];

export const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  const showDialog = useDialog();
  const showToast = useToast();

  useEffect(() => {
    axios.get('http://localhost:8000/categories').then((res) => {
      setCategories(res.data);
    });
  }, []);

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:8000/categories/${id}`)
      .then(() => {
        showToast('Category deleted!', 'success');
        const newCategories = categories.filter((category) => category.id !== id && category);
        setCategories(newCategories);
      })
      .catch((err) => showToast(err.response.data, 'error'));
  };

  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'title', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: '',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <Stack sx={{ flexDirection: 'row' }}>
          <Tooltip title='Edit'>
            <IconButton aria-label='edit' color='primary' onClick={() => navigate(`/categories/edit/${params.row.id}`)}>
              <Edit fontSize='inherit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton
              aria-label='delete'
              color='secondary'
              onClick={() =>
                showDialog('Delete category', 'Are you sure you want to delete this category?', () =>
                  deleteCategory(params.row.id)
                )
              }
            >
              <Delete fontSize='inherit' />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

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
        <Typography variant='h4' sx={{ mb: 3 }}>
          Categories
        </Typography>
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant='contained' onClick={() => navigate('/categories/create')}>
            New
          </Button>
          <Button variant='contained'>Filter</Button>
        </Stack>
        <Box sx={{ height: 400, width: '100%', mt: 3 }}>
          <DataGrid
            rows={categories}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </Stack>
    </>
  );
};
