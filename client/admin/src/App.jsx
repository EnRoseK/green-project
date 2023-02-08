import './styles/bootstrap.min.css';
import './styles/styles.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignInSuccess } from './pages/SignInSuccess';
import { SignUp } from './pages/SignUp';
import { SignInError } from './pages/SignInError';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { SignOut } from './pages/SignOut';
import { Categories } from './pages/Categories';
import { ToastContainer } from 'react-toastify';
import { PostCreate } from './components/Blogs/PostCreate';
import { PostEdit } from './components/Blogs/PostEdit';
import { MenuPositions } from './pages/MenuPositions';
import { Menus } from './pages/Menus';
import axios from 'axios';
import { ModalProvider } from './context/ModalContext';

const App = () => {
  const [me, setMe] = useState(undefined);
  const [menuShow, setMenuShow] = useState(false);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const myData = localStorage.getItem('me');
    if (myData !== 'undefined') {
      setMe(JSON.parse(myData));
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/menus/admin').then((res) => setMenus(res.data));
  }, []);

  if (!me) {
    return (
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signin/success' element={<SignInSuccess setMe={setMe} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<SignInError />} />
      </Routes>
    );
  }

  return (
    <ModalProvider>
      <Navbar onToggle={() => setMenuShow(!menuShow)} />
      <div className='main-wrapper'>
        <div className={`off-menu bg-dark ${menuShow && 'show'}`}>
          <ul>
            {menus.map((menu) => (
              <li>
                <Link to={menu.link} target={menu.newTab ? '_blank' : '_self'}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='off-menu-sibling'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/articles/create' element={<PostCreate />} />
            <Route path='/articles/edit/:id' element={<PostEdit />} />
            <Route path='/menu-positions' element={<MenuPositions />} />
            <Route path='/menu-positions/:id' element={<Menus />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/signout' element={<SignOut setMe={setMe} />} />
          </Routes>
        </div>
      </div>

      <ToastContainer />
    </ModalProvider>
  );
};

export default App;
