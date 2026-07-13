import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, updateQuantity }) => {
    const navigate = useNavigate();
    
const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

if (cart.length === 0)  {
    return (
        <div  style={{padding:"40px", textAlign:"center", }}>
            <h2>Your cart is empty   </h2>
            <button onClick={() => navigate('/')}
                style={{padding:'10px 20px' ,background:"#007bff",color:"white",borderRadius:"5px",border:"none",cursor:"pointer",marginTop:"20px"}}>
                    Go back to shopping
            </button>

        </div>
    );
}
return(
    <div style={{padding:"20px",maxWidth:"800px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h2>Shoping cart</h2>
            <button onClick={() => navigate('/')} style={{cursor:"pointer",padding:"8px 15px"}}>Back to Home</button>
        </div>
        <div style={{marginTop:"20px"}}>
            {cart.map((item) => (
                <div key={item.id} style={{display:"flex",alignItems:"center",borderBottom:"1px solid #ccc",padding:"15px 0" }}>
                    <img src ={item.imageurl} alt={item.name} style={{width:"120px",height:"120px",objectFit:"cover",borderRadius:"8px"}} />
                    <div style={{flex: 1}}>
                        <h3 style={{margin:'0 0 10px 0'}}>{item.name}</h3>
                        <p style={{margin:'0 0 10px 0',color:"gray", fontSize:"14px"}}>{item.description}</p>
                        <p style={{margin:'0 0 10px 0',fontWeight:"bold"}}>{item.price}</p>
                        <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
                            <button onClick={() => updateQuantity(item.id,item.quantity - 1)} style ={{ width:"30px", height:"30px", fontSize:"18px",cursor:"pointer",background:"#eee", border:" 1px solid #ccc"}}> - </button>

                            <span style ={{fontSize:"18px", fontWeight:"bold"}}>{item.quantity}</span>

                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{width:"30px",height:"30px",fontSize:"18px",cursor:"pointer",background:"#eee",border:"1px solid #ccc"}}> +

                            </button>
                        </div>
                    </div>
                    <div style={{fontWeight:"bold",fontSize:"18px"}}>
                        {item.price * item.quantity}
                    </div>
                </div>
            ))}
        </div>
               <div style={{marginTop:"30px",paddingTop:"20px",borderTop:"2px solid #000",textAlign:"right"}}>
                <h2>Total Amount: {totalPrice}</h2>

        <button style={{padding:"15px 30px",background:'#28a745',color:"white",border:"none",borderRadius:"5px", fontSize:"18px", cursor:"pointer",marginTop:"10px"}}
        >
            Buy Now
        </button>
        </div>
    </div>
);
};
export default Cart;