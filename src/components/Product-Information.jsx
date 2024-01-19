import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

function ProductInformation() {
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
        
    return (
        <>
        </>
    )
}

export default ProductInformation