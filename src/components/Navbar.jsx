import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import logoImage from '../assets/coolshop-logo.png'
import '../css/navbar.scss'

function Navbar() {
  const [category, setCategory] = useState([])

  useEffect(() => {
    fetchCategory()
  },[])

  const fetchCategory = async () => {
    // await axios.get("https://fakestoreapi.com/products/categories").then((categoryList) =>{
    //   setCategory(categoryList.data);      
    // })
    setCategory(["electronics", "jawelry", "man's cloth", "woman's cloth"])
  }

  return (
    <>
      <div className='navbar d-flex px-2 mb-5'>
        <Link className='navbar__logo' to={"/"}>
          <img className='navbar__logo--img' src={logoImage} alt="coolshop-logo" />
          <h1 className='navbar__logo--text'>Cool Shop</h1>
        </Link>

        <div className='navbar__category d-flex'>
          {category.map((category, index) => (
            <Link className='navbar__category--border ms-3' key={index} to={`/?category=${category}`}>
              <b className='navbar__category--text'>{category}</b>
            </Link>
          ))}

        </div>
      </div>
    </>
  )
}

export default Navbar