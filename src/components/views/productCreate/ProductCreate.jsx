import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { validateCategory, validatePrice, validateProductName, validateUrl } from '../../../helpers/validateFields';
import Swal from "sweetalert2";

const ProductCreate = () => {
  //States
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [urlImg, setUrlImg] = useState('');
  const [category, setCategory] = useState('');

  //One general State

  //create products
  const handleSubmit = (e) => {
    e.preventDefault();
    //validar los campos
    if (
      !validateProductName(productName) ||
      !validatePrice(price) ||
      !validateUrl(urlImg) ||
      !validateCategory(category)
    ) {
      Swal.fire('Oop!!', 'Some data is invalid', 'Error');
      return
    }
    
    //enviar datos
    //crear el producto
    const newProduct = {
      productName,
      price,
      urlImg,
      category
    }
    
    //preguntar al usuario si esta seguro
    //la petición post
    //mensaje confirmando o informando errores al usuario

  };

  return (
    <div>
      <Container className='py-5'>
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className='my-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: Burger'
              name='productName'
              onChange={({ target }) => setProductName(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: 50'
              name='price'
              onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type='text'
              name='urlImg'
              onChange={({ target }) => setUrlImg(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name='category'
              onChange={({ target }) => setCategory(target.value)}
            >
              <option value=''>Select an option</option>
              <option value='de-carne'>de Carne</option>
              <option value='de-cerdo'>de Cerdo</option>
              <option value='de-pollo'>de Pollo</option>
              <option value='veganas'>Veganas</option>
              <option value='bebidas'>Bebidas</option>
              <option value='postre'>Postre</option>
            </Form.Select>
          </Form.Group>
          <div className='text-end'>
            <button className='btn-yellow'>Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
