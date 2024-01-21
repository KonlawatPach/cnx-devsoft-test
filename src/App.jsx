import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './css/global.scss'
import Navbar from './components/Navbar';
import Menu from './components/Product-Menu'
import ProductInformation from './components/Product-Information';
import CreateProduct from './components/Create-Product';
import EditProduct from './components/Edit-Product';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="text-center">
        <Navbar></Navbar>
          <Routes>
            <Route exact path='/' element={<Menu />}></Route>
            <Route exact path='/product/:id' element={<ProductInformation />}></Route>
            <Route exact path='/product/create' element={<CreateProduct />}></Route>
            <Route exact path='/product/edit/:id' element={<EditProduct />}></Route>
          </Routes>
      </div>
    </Router>
  )
}

export default App
