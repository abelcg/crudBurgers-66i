import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import ProductsTable from './components/views/productTable/ProductsTable';
import Error404 from './components/views/error404/Error404';
import { useState, useEffect } from 'react';
import ProductCreate from './components/views/productCreate/ProductCreate';
import ProductEdit from './components/views/productEdit/ProductEdit';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //llamada a la API
    getApi();
  }, []);

  const getApi = async () => {
    try {
      const res = await fetch('http://localhost:3005/products');
      const productApi = await res.json();
      setProducts(productApi);
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <BrowserRouter>
      <Navigation />
      <main>
        <Routes>
          <Route exact path='/' element={<Home products={products} />} />
          <Route exact path='/product/table' element={<ProductsTable />} />
          <Route exact path='/product/create' element={<ProductCreate />} />
          <Route exact path='/product/edit/:id' element={<ProductEdit />} />
          <Route exact path='*' element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
