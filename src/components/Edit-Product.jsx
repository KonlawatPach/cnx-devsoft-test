import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';

import '../css/product-information.scss'


function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({})
  const [cartNumber, setCartNumber] = useState(0)

  useEffect(() => {
      fetchData()
  },[])

  const fetchData = async () => {
      await axios.get(`https://fakestoreapi.com/products/${id}`).then(({data}) =>{
          setProduct(data);
      })
  }

  const changeCart = (event) => {
      setCartNumber(Number(event.target.value));
  }
  const deleteCart = () => {
      setCartNumber((prevNumber) => Math.max(prevNumber - 1, 0));
    };
  
    const addCart = () => {
      setCartNumber((prevNumber) => prevNumber + 1);
    };
      
  return (
      <div className='productshow container mx-auto'>
          <div className='row gx-5 gy-3'>
              <div className='productshow__image col-md-6 col-12 border border-dark rounded'>
                  <img className='mx-auto' src={product.image} alt={product.title} />
              </div>
              <div className='productshow__information col-md-6 col-12 text-start px-md-4 px-2'>
                  <h3 className='fw-bold mb-3'>{product.title}</h3>
                  <h4 className='mb-2'>Price : {product.price} Dollar</h4>
                  <p className='productshow__information--description'>{product.description}</p>

                  <div className='productshow__information--cart mt-4 row'>
                      <div className='productshow__information--cartinput col d-flex'>
                          <button className="btn btn-primary " onClick={deleteCart}>-</button>
                          <input className='form-control w-50 text-center' type="number" min={0} onChange={changeCart} value={cartNumber}/>
                          <button className="btn btn-primary " onClick={addCart}>+</button>
                      </div>
                      <button className="btn btn-success col" disabled={cartNumber<=0} onClick={() => {}}>Buy This Product</button>
                  </div>
              </div>
          </div>

          <div>
              <button onClick={() => {navigate(`/product/edit/${product.id}`)}} className='btn btn-warning mt-5'>แก้ไขสินค้านี้</button>
          </div>
      </div>
  )
}

export default EditProduct