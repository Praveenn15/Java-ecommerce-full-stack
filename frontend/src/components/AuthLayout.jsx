import React from "react";
import './Authlayout.css';
import ParticlesBg from "./ParticlesBg";

const AuthLayout = ({children}) => {
    return (
        <div className="page-container">
            <div className="particles-container">
                <ParticlesBg />
            </div>
            <div className="form-wrapper">
                {children}
            </div>
        </div>
    );
};
export default AuthLayout;