import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import logoImage from '../assets/coolshop-logo.png'
import '../css/navbar.scss'

function Navbar() {
  const [category, setCategory] = useState([])
  const [dropdown, setDropdown] = useState(false)
  const [dropdowBottom, setDropdownBottom] = useState('160px')

  useEffect(() => {
    fetchCategory()
  },[])

  const fetchCategory = async () => {
    await axios.get("https://fakestoreapi.com/products/categories").then((categoryList) =>{
      setCategory(categoryList.data);      
    })
  }

  const toggleDropdown = () => {
    setDropdown(dropdown ? false : true);
    setTimeout(() => {
      setDropdownBottom(dropdown ? '160px' : '0px')
    }, 1);
  }

  return (
    <div className='navigationbar'>
      <div className='navbar d-flex px-2'>
        <Link className='navbar__logo' to={"/"}>
          <img className='navbar__logo--img' src={logoImage} alt="coolshop-logo" />
          <h1 className='navbar__logo--text'>Cool Shop</h1>
        </Link>

        <div className='navbar__category d-lg-flex d-none'>
          {category.map((category, index) => (
            <Link className='navbar__category--border ms-3' key={index} to={`/?category=${category}`}>
              <b className='navbar__category--text'>{category}</b>
            </Link>
          ))}
        </div>
        <div className='d-lg-none d-block'>
          <button className="navbar-toggler bg-white" type="button" onClick={toggleDropdown}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>

      <div className={`d-lg-none dropdown ${dropdown ? 'dropdown__show' : 'dropdown__hide'}`} style={{bottom: dropdowBottom}}>
        {category.map((category, index) => (
          <Link className='dropdown-plate' key={index} to={`/?category=${category}`}>
            <b className=''>{category}</b>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar