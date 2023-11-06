/* eslint-disable react/prop-types */
import { Container, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../config/axiosInit';
import { useEffect, useRef, useState } from 'react';
import {
  validateCategory,
  validatePrice,
  validateProductName,
  validateUrl,
} from '../../../helpers/validateFields';
import Swal from 'sweetalert2';
import { STATUS } from '../../../constants';

const ProductEdit = ({ getApi }) => {
  //State
  const [product, setProduct] = useState({});

  //naviagate
  const navigate = useNavigate();

  //Param
  const { id } = useParams();
  const URL = import.meta.env.VITE_API_HAMBURGUESERIA;

  //References
  const productNameRef = useRef(null);
  const priceRef = useRef(null);
  const urlImgRef = useRef(null);

  // console.log(productNameRef.current.value);

  useEffect(() => {
    getOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOne = async () => {
    try {
      //la peticion usando fetch
      /* const res = await fetch(`${URL}/${id}`);
      const productApi = await res.json(); */

      const res = await axios.get(`${URL}/${id}`);
      const productApi = res.data;

      setProduct(productApi);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(productNameRef.current.value);
    //validaciones
    if (
      !validateProductName(productNameRef.current.value) || 
      !validatePrice(priceRef.current.value) ||
      !validateUrl(urlImgRef.current.value) ||
      !validateCategory(product.category)
    ) {
      Swal.fire('Oop!!', 'Some data is invalid', 'Error');
      return;
    }

    //guardaer el objeto a actualizar
    const productUpdated = {
      productName: productNameRef.current.value,
      price: priceRef.current.value,
      urlImg: urlImgRef.current.value,
      category: product.category,
    };

    //preguntar al usuario si esta seguro
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Upadate',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //la petición post usando fetch
          /* const res = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productUpdated),
          }); */

          const res = await axios.put(`${URL}/${id}`, productUpdated);

          console.log(res);

          if (res.status === STATUS.STATUS_OK) {
            Swal.fire(
              'updated',
              'Your product have been updated successfully',
              'success'
            );
            //recargar la tabla
            getApi();
            //navegar hasta la tabla de productos
            navigate('/product/table');
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Container className='py-5'>
        <h1>Edit Product</h1>
        <hr />
        {/* Form Product */}
        <Form className='my-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: burger'
              defaultValue={product?.productName}
              ref={productNameRef}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: 50'
              defaultValue={product?.price}
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20'
              defaultValue={product?.urlImg}
              ref={urlImgRef}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Label>Category*</Form.Label>
            <Form.Select
              value={product?.category}
              onChange={({ target }) =>
                setProduct({ ...product, category: target.value })
              }
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
            <button className='btn-orange'>Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductEdit;
