import React,{useState} from "react";
import axios from "axios";

const API_URL = 'https://java-ecommerce-full-stack.onrender.com';

const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step,setStep] = useState(1);
    const [message, setMessage] = useState('')

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try{
            const res = await  axios.post(`${API_URL}/api/auth/forgot-password`, {email});
            setMessage(res.data);
            setStep(2);
        } catch (error) {
            console.error(error);
            const errorData = error.response?.data;

            if (typeof errorData === 'object') {
                setMessage("Server error : OTP is not going ! Check backend logs!");
            } else {
                setMessage(errorData || "Email not found!");

            }

        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/reset-password`, {email, otp,newPassword});
            alert(res.data);
            window.location.href = '/login';
        } catch (error) {
            setMessage(error.response?.data || "Wrong OTP");
        }
    };
    return (
        
        <div  className="page-container">
        <video autoPlay = {true} muted= {true} loop = {true} playsInline= {true} className="bg-video">
            <source src="/pink.mp4" type="video/mp4" />
        </video>
            <h2 style={{textAlign:"center"}}> Forgot Password</h2>
            {message && <p style={{textAlign:"center",color:"blue",fontWeight:"bold"}}>{message}</p>}
            {step === 1 ? (
                <form className="page-wrapper" onSubmit={handleSendOtp}>
                     <div  className="input-grp">
                    <label>Enter your reset email:</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"100%",padding:"8px",margin:"10px 0"}} />
                    <button type="submit" style={{width:"100%",padding:"10px",backgroundColor:"#007bff",color:'white',border:"none",cursor:"pointer"}}>Send OTP</button>
                     </div>
                </form>

            ) :(
                <form className="page-wrapper" onSubmit={handleResetPassword}>
                     <div  className="input-grp">
                    <label> Enter OTP</label>
                    <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} style={{width:"100%",padding:"8px",margin:"10px 0"}} />
                    <label>Enter new password</label>
                    <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{width:"100%",padding:"8px",margin:"10px 0"}} />
                    <button type="submit" style={{width:"100%",padding:"10px",backgroundColor:"#2a8745",color:'white',border:"none",cursor:"pointer"}}>Update password</button>
                     </div>
                </form>
            )}
        </div>
        
    );
};
export default ForgotPassword;