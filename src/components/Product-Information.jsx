import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import '../css/product-information.scss'

function ProductInformation() {
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


    // cart function
    const changeCart = (event) => {
        setCartNumber(Number(event.target.value));
    }
    const deleteCart = () => {
        if(cartNumber>0) setCartNumber(cartNumber-1);
    }
    const addCart = () => {
        setCartNumber(cartNumber+1);
    }

    // buy function
    const buyProduct = () => {
        Swal.fire({
            icon: "success",
            text: `Buying ${product.title} ${cartNumber} items!`
        })
        navigate(`/`)
    }
        
    return (
        <div className='productshow container mt-5'>
            <div className='mx-auto row gx-5 gy-3'>
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
                        <button className="btn btn-success col" disabled={cartNumber<=0} onClick={buyProduct}>Buy This Product</button>
                    </div>
                </div>
            </div>

            <div>
                <button onClick={() => {navigate(`/product/edit/${product.id}`)}} className='btn btn-warning mt-5'>Edit This Product</button>
            </div>
        </div>
    )
}

export default ProductInformation