import { Box, Button } from '@mui/material';
import { Layout } from './components/Layout';
import { useToast } from './hooks';
import { useCrud } from './hooks/useCrud';
import { useDialog } from './hooks/useDialog';

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
