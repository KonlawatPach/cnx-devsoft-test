import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductInformation() {
    const { id } = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetchData()
        console.log(id);
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