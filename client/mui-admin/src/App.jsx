import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { useToast } from './hooks';
import { useCrud } from './hooks/useCrud';
import { useDialog } from './hooks/useDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const showToast = useToast();
  const showDialog = useDialog();

  const { getList, getItem, createItem, updateItem, deleteItem } = useCrud('http://localhost:8000/categories');

  return (
    <Layout>
      <Box sx={{ p: 5 }}>
        <Button variant='contained' onClick={() => showToast('Hello Toast', 'success')}>
          Toggle Toast
        </Button>
        <Button variant='outlined' sx={{ marginLeft: 2 }} onClick={() => showDialog()}>
          Toggle Dialog
        </Button>
      </Box>
    </Layout>
  );
};

export default App;
