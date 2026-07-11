import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
 import offlineAnimation from './assets/errorcat.json'
 import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  
      const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
      useEffect(() => {
          const handleOnline = () => setIsOffline(false);
          const handleOffline = () => setIsOffline(true);

          const handleGlobalClick = () => {
            if (!navigator.onLine) {
              setIsOffline(true);
            }
          };  
          window.addEventListener('online', handleOnline);
          window.addEventListener('offline',handleOffline);
          window.addEventListener('click',handleGlobalClick);
  
          return () => {
              window.removeEventListener('online',handleOnline);
              window.removeEventListener('offline',handleOffline);
              window.removeEventListener('click',handleGlobalClick);
          };
      }, [])
  
      if(isOffline) {
          return (
              <div  style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center',minHeight:'100vh'}}>
                      <DotLottieReact
                      autoplay={true}
                      loop={true}
                      src="/cat.lottie"
                      style={{height:'200px',width:'200px',margin:'0 auto'}} 
                      />
                      <h2>No Internet Connection</h2>
                      <p>It Looks Like You're offline.Please check your network and try again.</p>
                     
  
                  
              </div>
          );
      
      
  }
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