
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './App.css'
 
 


import Loader from "./components/Loader";
import React,{Suspense, lazy, useEffect, useState} from "react";

const Home = lazy(() => import ('./pages/Home'));
const Signup = lazy(() => import ('./pages/Signup'));
const Login = lazy(() => import ('./pages/Login'));
const ForgotPassword = lazy(() => import ('./pages/ForgotPassword'));
const Cart = lazy(() => import ('./pages/Cart'));

const API_URL = 'https://java-ecommerce-full-stack.onrender.com/api/products';


function App() {

  const [isLoading,setIsLoading] = useState(true);
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState([]);


  useEffect(() => {
    const fetchInitialData = async () => {

    
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Data fetching error",error);
    } finally {
      setIsLoading(false)
    }
  };
fetchInitialData();
  },[]);
  if (isLoading) {
    return <Loader />;
  }
  
  

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
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home cart= {cart} addToCart={addToCart} />} />
        <Route path="/cart" element = { <Cart cart ={cart} updateQuantity={updateQuantity} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element ={<ForgotPassword/>} />
      </Routes>
      </Suspense>
      
    </Router>
  );
}
export default App;