import React, { useRef } from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

import '../css/product-information.scss'
import '../css/product-form.scss'


function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [categoryList, setcategoryList] = useState([]);

    // input
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // load category and old data
    useEffect(() => {
        fetchProduct()
        fetchCategory()
    }, [])

    const fetchProduct = async () => {
        await axios.get(`https://fakestoreapi.com/products/${id}`).then((productData) => {
            setTitle(productData.data.title)
            setPrice(productData.data.price)
            setImage(productData.data.image)
            setCategory(productData.data.category)
            setDescription(productData.data.description)
        })
    }

    const fetchCategory = async () => {
        await axios.get("https://fakestoreapi.com/products/categories").then((categoryList) => {
            setcategoryList(categoryList.data);
        })
    }

    // image upload
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // upload Product
    const UpdateProduct = async (e) => {
        e.preventDefault();

        // form not complete
        if (!title.trim() || !price || !description.trim() || image === null) {
            Swal.fire({
                icon: "error",
                text: "Please fill in all required fields."
            });
            return;
        }

        // form complete
        let formData = {
            title: title,
            price: price,
            description: description,
            image: 'https://i.pravatar.cc',
            category: category
        }
        formData = JSON.stringify(formData)

        await axios.put(`https://fakestoreapi.com/products/${id}`, formData).then((res) => {
            Swal.fire({
                icon: "success",
                text: `Update ${title}(id: ${res.data.id}) Successfuly!`
            })
            navigate(`/product/${id}`)

        }).catch(({ res }) => {
            Swal.fire({
                icon: "error",
                text: res.data.message
            });
        })

    }

    return (
        <div className='productshow container'>
            <h3 className='mb-4 fw-bold'>Edit Product {}</h3>
            <form className='row gx-5 gy-3 mx-auto' onSubmit={UpdateProduct}>
                <div className='productshow__image productshow__imageform col-md-6 col-12 border border-dark rounded' onClick={handleClick}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} />
                    {image ? (
                        <img src={image} alt="Upload Product Image" />
                    ) : (
                        <p>Click here to upload a Product Image</p>
                    )}
                </div>
                <div className='productshow__informationform col-md-6 col-12 text-start px-md-4 px-2'>
                    <p>
                        <label>Product Name : </label>
                        <input className='form-control border-dark' value={title} type="text" onChange={(event) => { setTitle(event.target.value) }} />
                    </p>

                    <p>
                        <label>Price (Dollar) : </label>
                        <input className='form-control border-dark' value={price} type="number" min="0" onChange={(event) => { setPrice(event.target.value) }} />
                    </p>

                    <p>
                        <label>Product Category : </label>
                        <select className='form-control border-dark' value={category} onChange={(event) => { setCategory(event.target.value) }}>
                            {categoryList.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </p>

                    <p>
                        <label>Product Description : </label>
                        <textarea className='form-control border-dark' cols="30" rows="10" value={description} onChange={(event) => { setDescription(event.target.value) }}></textarea>
                    </p>

                </div>
                <div className='button-bar'>
                    <button type='submit' className='btn btn-warning'>Update This Product</button>
                    <button type='button' onClick={() => { navigate(`/product/${id}`) }} className='btn btn-danger'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProduct