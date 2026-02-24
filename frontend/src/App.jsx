import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import your page components
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './Pages/ContactPage';
// Assuming your main Layout (Header/Navbar/Footer) is a component
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';


const App = () => {

  return (
    <>
    <Router>
      <Navbar /> 

      <Routes>
        {/* Default Route: Redirect to Shop or home */}
        <Route path="/" element={<Homepage/>} />
        
        {/* Main Pages */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* 404 Route */}
        <Route path="*" element={<div className="text-center py-20 text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  
    </>
  );
};

export default App;