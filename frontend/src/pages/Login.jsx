import React, {useState} from "react";
import axios from "axios";
import { useNavigate,Link,Form } from "react-router-dom";



function Login(){

const [formData,setFormData] = useState ({
    email: "",
    password: ""
});

const navigate  = useNavigate();

//for update state when input bx changes
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
};
const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const response = await axios.post ("https://java-ecommerce-full-stack.onrender.com/api/auth/login",formData
);
if (response.status === 200 || response.status === 201) {
    localStorage.setItem("user",JSON.stringify(response.data));
    alert ("🎉Login successfully");
    navigate("/");
}
}catch (error) {
    console.error("Login failed! please try again or check networks",error)
    alert(error.response?.data?.message || "❌Login failed!")
}
    };
    
return(
    

     

        <div  className="page-container">
       
          <h2>Login</h2>

         <form onSubmit={handleSubmit} className="page-wrapper">
            <div  className="input-grp">
                <label>User Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{width:"100%", padding:"8px",marginTop:"5px"}} /> 
            </div>
        
            <div  className="input-grp">
                <label>User Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{width:"100%", padding:"8px",marginTop:"5px"}} /> 
            </div>
            <a href="/forgot-password" style={{color:"#007bff",textDecoration:"none",fontSize:"14px"}}>Forgot Password?</a>

             <button type="submit" style={{width:"100%",padding:"10px",backgroundColor:"#28a745",color:"white",border:"none",borderRadius:"5px",cursor:"pointer"}}>Login </button>       
          <p style={{marginTop:"15px" , textAlign:"center"}}>
            Dont have an account ? <Link to="/signup" style={{textDecoration:"none",color:"#007bff"}}> Sign-in here</Link>
           </p>
          </form>
     </div>
 
    
);
}
export default Login;
