import { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/views/home/Home';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Error404 from './components/views/error404/Error404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/views/productTable/ProductsTable';

import axios from './config/axiosInit';
import ProductCreate from './components/views/productCreate/ProductCreate';
import ProductEdit from './components/views/productEdit/ProductEdit';

function App() {
  const [products, setProducts] = useState([]);
  const URL = import.meta.env.VITE_API_HAMBURGUESERIA;

  useEffect(() => {
    //llamada a la API
    getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApi = async () => {
    try {
      /* const res = await fetch(URL);
      const productApi = await res.json();
      setProducts(productApi);
       */

      const res = await axios.get(URL);
      //console.log(res.data);
      setProducts(res.data);
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
          <Route
            exact
            path='/product/table'
            element={<ProductsTable products={products} />}
          />
          <Route exact path='/product/create' element={<ProductCreate URL={URL} getApi={getApi} />} />
          <Route exact path='/product/edit/:id' element={<ProductEdit />} />
          <Route exact path='*' element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
