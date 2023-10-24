import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/views/home/Home';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Error404 from './components/views/error404/Error404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/views/productTable/ProductsTable';
import ProductCreate from './components/views/productCreate/ProductCreate';
import ProductEdit from './components/views/productEdit/ProductEdit';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/product/table' element={<ProductsTable/>}/>
            <Route exact path='/product/create' element={<ProductCreate/>}/>
            <Route exact path='/product/edit/:id' element={<ProductEdit/>}/>
            <Route exact path='*' element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
