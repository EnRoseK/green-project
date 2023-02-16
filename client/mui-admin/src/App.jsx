import { Stack } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CategoriesScreen, HomeScreen, CategoryCreate, CategoryEdit } from './pages';

const bgColor = blueGrey[50];

const App = () => {
  const wrapperStyle = {
    p: 5,
    bgcolor: bgColor,
    minHeight: 'calc(100vh - 65px)',
    boxSizing: 'border-box',
  };

  return (
    <Layout>
      <Stack sx={wrapperStyle}>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/categories' element={<CategoriesScreen />} />
          <Route path='/categories/create' element={<CategoryCreate />} />
          <Route path='/categories/edit/:id' element={<CategoryEdit />} />
        </Routes>
      </Stack>
    </Layout>
  );
};

export default App;
