import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element ={<ForgotPassword/>} />
      </Routes>
    </Router>
  );
}
export default App;