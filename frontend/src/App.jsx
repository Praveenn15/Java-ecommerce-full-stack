import React   ,{useState}from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './App.css'
 
 

import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";


function App() {
  
  const [cart,setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      if (isExist) {

        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1} : item);
      }

      return [...prevCart, { ...product, quantity:1}];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if(newQuantity < 1) return;
    setCart((prevCart) =>
    prevCart.map((item) => 
    item.id === productId ? { ...item, quantity: newQuantity} : item 
      ) 
    );
  };
  return (
  <Router>
      
      <Routes>
        <Route path="/" element={<Home cart= {cart} addToCart={addToCart} />} />
        <Route path="/cart" element = { <Cart cart ={cart} updateQuantity={updateQuantity} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element ={<ForgotPassword/>} />
      </Routes>
      
    </Router>
  );
}
export default App;