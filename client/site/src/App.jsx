import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ChatScreen } from './pages/ChatScreen';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { SingleArticle } from './pages/SingleArticle';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/articles/:id' element={<SingleArticle />} />
                <Route path='/categories/:categoryId' element={<Home />} />
                <Route path='/chat' element={<ChatScreen />} />
                <Route path='/products' element={<Products />} />
            </Routes>
            {/* <Footer /> */}
        </>
    );
}

export default App;
