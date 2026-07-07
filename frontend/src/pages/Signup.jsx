import React, { useState} from "react";
import axios from "axios";
import {useNavigate, Link, Form} from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
    });
    const navigate = useNavigate();
    
    //For update state when input box changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    // Send data to Backend when form submit 
    const handleSubmit= async (e) => {
        e.preventDefault();
        try{
          const response = await axios.post(
        "https://java-ecommerce-full-stack.onrender.com/api/auth/signup",
        formData
    );

    if (response.status === 200 || response.status === 201) {
        alert("🎉 Account successfully created! You can login now!");
        navigate("/login");
      }
  }catch (error) {
   console.error("Signup Error:",error);
        alert(error.response?.data?.message || "❌signup failed!");
    }
};
return (
 <div style={{maxWidth: "400px",margin: "50px auto",padding:"20px", border: "1px solid #ccc",borderRadius: "8px"}}>
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
        <div style={{marginBottom: "15px"}}>
            <label>Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{width: "100%",padding:"8px",marginTop:"5px"}} />
        </div>
        <div style={{marginBottom: "15px"}}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{width: "100%",padding:"8px",marginTop:"5px"}} />
        </div>
        <div style={{marginBottom: "15px"}}>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{width: "100%",padding:"8px",marginTop:"5px"}} />
        </div>
        <button type="submit" style={{width:"100%",padding:"10px",backgroundColor:"#28a745",color:"white",border:"none",borderRadius:"5px",cursor:"pointer"}}>SignUp</button>
    </form>
    <p style={{marginTop:"15px",textAlign:"center"}}>Already have account? <Link to ="/Login">Login here</Link></p>
 </div>
);
}
export default Signup;