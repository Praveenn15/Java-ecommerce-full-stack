import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
 
 

import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OfflineGuard from "./pages/OfflineGuard";

function App() {
  
  
  
  <Router>
      <OfflineGuard>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element ={<ForgotPassword/>} />
        
      </Routes>
      </OfflineGuard>
    </Router>
  
}
export default App;