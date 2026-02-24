import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './Pages/ContactPage';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './Pages/PageNotFound';


const App = () => {

  return (
    <>
    <Router>

      <Routes>
        {/* Default Route: Redirect to Shop or home */}
        <Route path="/" element={<Homepage/>} />
        
        {/* Main Pages */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 404 Route */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  
    </>
  );
};

export default App;