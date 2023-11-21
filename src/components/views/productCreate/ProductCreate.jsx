/* eslint-disable react/prop-types */
import { Alert, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import {
  validateCategory,
  validatePrice,
  validateProductName,
  validateUrl,
} from '../../../helpers/validateFields';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/axiosInit';
import { STATUS } from '../../../constants';

const ProductCreate = ({ URL, getApi }) => {
  //States
  /* const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [urlImg, setUrlImg] = useState('');
  const [category, setCategory] = useState(''); */
  //const STATUS_CREATED = 201;
  const navigate = useNavigate();
  //One general State
  const [inputs, SetInputs] = useState({});
   //errors state
   const [errorMessage, setErrorMessage] = useState(null);
   const [show, setShow] = useState(false);

  const handleChange = (event)=>{
   //const value = event.target.value;
   //const name = event.target.name;

   const { value, name } = event.target;
   //console.log(name, value);
   SetInputs((prevValues) => ({...prevValues,  [name]: value}))
  
  }


  //create products
  const handleSubmit = (e) => {
    e.preventDefault();
    //validar los campos
    if (
      /* !validateProductName(productName) ||
      !validatePrice(price) ||
      !validateUrl(urlImg) ||
      !validateCategory(category) */
      !validateProductName(inputs.productName) ||
      !validatePrice(inputs.price) ||
      !validateUrl(inputs.urlImg) ||
      !validateCategory(inputs.category)
    ) {
      Swal.fire('Oop!!', 'Some data is invalid', 'Error');
      return;
    }

    //enviar datos
    //crear el producto
    const newProduct = {
     /*  productName,
      price,
      urlImg,
      category, */
      productName: inputs.productName,
      price: inputs.price,
      urlImg: inputs.urlImg,
      category: inputs.category,
    };

    //preguntar al usuario si esta seguro
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
           /* const res = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token")).token
            },
            body: JSON.stringify(newProduct),
          }); */
          const res = await axios.post(URL, newProduct, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });

          console.log(res);

          if (res.status === STATUS.STATUS_CREATED) {
            Swal.fire(
              'Created',
              'Your product have been created successfully',
              'success'
            );

            //resetear el formulario
            e.target.reset(); //e.target en este caso es por el event submit de form por ende encuetro el form
            //recargar la tabla
            getApi();
            //navegar hasta la tabla de productos
            navigate('/product/table');
          }
        } catch (error) {
          console.log(error);
          error.response.data?.message &&
          setErrorMessage(error.response.data?.message);

          error.response.data?.errors?.length > 0 &&
          error.response.data.errors?.map((error) =>
            setErrorMessage(error.msg)
          );
        setShow(true);
        }
      }
    });

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
              onChange={handleChange}
              //onChange={({ target }) => setProductName(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: 50'
              name='price'
              onChange={handleChange}
              //onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type='text'
              name='urlImg'
               onChange={handleChange}
              //onChange={({ target }) => setUrlImg(target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name='category'
              onChange={handleChange}
              //onChange={({ target }) => setCategory(target.value)}
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
        {show && (
        <Alert
          key={errorMessage}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {errorMessage}
        </Alert>
        )}
      </Container>
    </div>
  );
};

export default ProductCreate;
