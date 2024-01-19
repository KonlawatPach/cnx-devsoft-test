import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/product-menu.scss'

function Menu() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        await axios.get("https://fakestoreapi.com/products").then(({data}) =>{
            setProduct(data);
            console.log(data);
        })
    }

    const truncateText = (inputText, maxLength) => {
        if (inputText.length > maxLength) {
          return inputText.substring(0, maxLength) + '...';
        } else {
          return inputText;
        }
      }
        
    return (
        <>
            <div className='product-menu container'>
                <div className='product-menu__grid row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 center mx-auto g-2'>
                    {product.map((data, index) => (
                        <div className='col' key={index}>
                            <div className='product-box text-center'>
                                <div className='product-box__image'>
                                    <img className='img-fluid' src={data.image} alt={data.title} />
                                </div>

                                <div className='product-box__content'>
                                    <h5 data-bs-toggle="tooltip" data-bs-placement="top" title={data.title} className='product-box__content--title d-flex'>{truncateText(data.title, 60)}</h5>
                                    <p className='product-box__content--description mb-2'>
                                        {truncateText(data.description, 200)}
                                    </p>
                                    <b className='product-box__content--price'>Price : {data.price} $</b>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Menu