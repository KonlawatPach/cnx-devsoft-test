import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../css/product-menu.scss'

function Menu() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([])
    const location = useLocation();

    useEffect(() => {
        setProductList([])
        handleFetchData();
    },[location.search])

    const fetchData = async (categoryURL = '') => {
        console.log(categoryURL);
        await axios.get(`https://fakestoreapi.com/products${categoryURL}`).then(({data}) =>{
            setProductList(data);
            console.log(data);
        })
    }

    const handleFetchData = () => {
        const params = new URLSearchParams(window.location.search);
        const categoryParams = params.get('category');
    
        if (categoryParams !== undefined && categoryParams !== null) {
          fetchData(`/category/${categoryParams}`);
        } else {
          fetchData();
        }
    };

    const truncateText = (inputText, maxLength) => {
        if (inputText.length > maxLength) {
          return inputText.substring(0, maxLength) + '...';
        }
        else {
          return inputText;
        }
    }
        
    return (
        <div className='product-menu container'>
            { productList.length <= 0 ? (
                <>
                    <div className="spinner-border" role="status"></div>
                    <h4 className='mt-3'>Loading . . .</h4>
                </>
            ) : (
                <>
                    <div className='d-flex justify-content-between mb-4'>
                        <button onClick={() => {navigate('/product/create')}} className='btn btn-primary'>Add New Product</button>
                        <input type="text" />
                    </div>

                    <div className='product-menu__grid row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 center mx-auto g-2'>
                        {productList.map((data, index) => (
                            <div className='col' key={index}>
                                <Link to={`product/${data.id}`}>
                                    <div className='product-box text-center'>
                                        <div className='product-box__image'>
                                            <img className='img-fluid' src={data.image} alt={data.title} />
                                        </div>

                                        <div className='product-box__content'>
                                            <h5 data-bs-toggle="tooltip" data-bs-placement="top" title={data.title} className='product-box__content--title d-flex'>{truncateText(data.title, 52)}</h5>
                                            <p className='product-box__content--description mb-2'>{truncateText(data.description, 200)}</p>
                                            <b className='product-box__content--price'>Price : {data.price} $</b>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Menu