import React from 'react'
import { Route, Routes } from 'react-router-dom';
//import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage2';
import Navbar from './components/Navbar';
import '../src/index.css'
import CartModal from './components/CartModal';
import CartPage from './Pages/Cartpage';
import Register from './Pages/Register';
import Login from './Pages/Login';


function App() {

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProductPage/>}/>
          {/* <Route path="/products" element={<ProductPage/>}/> */}
          <Route path="/cartmodal" element={<CartModal/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App
