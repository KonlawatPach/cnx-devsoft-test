import React, { useRef } from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/product-information.scss'

function CreateProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className='productshow container mx-auto'>
      <div className='row gx-5 gy-3'>
        <div className='productshow__image productshow__imageinput col-md-6 col-12 border border-dark rounded' onClick={handleClick}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange}/>
          {selectedImage ? (
            <img src={selectedImage} alt="Selected Image"/>
          ) : (
            <p>Click here to upload an image</p>
          )}
        </div>
        <div className='productshow__information col-md-6 col-12 text-start px-md-4 px-2'>
          {/* <h3 className='fw-bold mb-3'>{product.title}</h3>
          <h4 className='mb-2'>Price : {product.price} Dollar</h4>
          <p className='productshow__information--description'>{product.description}</p>

          <div className='productshow__information--cart mt-4 row'>
            <div className='productshow__information--cartinput col d-flex'>
              <button className="btn btn-primary " onClick={deleteCart}>-</button>
              <input className='form-control w-50 text-center' type="number" min={0} onChange={changeCart} value={cartNumber} />
              <button className="btn btn-primary " onClick={addCart}>+</button>
            </div>
            <button className="btn btn-success col" disabled={cartNumber <= 0} onClick={() => { }}>Buy This Product</button>
          </div> */}
        </div>
      </div>

      <div className='button-bar'>
        <button onClick={() => { navigate('/') }} className='btn btn-danger mt-5'>Cancel</button>
        <button onClick={() => { navigate(`/product/edit/${product.id}`) }} className='btn btn-success mt-5'>Create New Product</button>
      </div>
    </div>
  )
}

export default CreateProduct