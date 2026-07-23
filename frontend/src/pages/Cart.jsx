import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, updateQuantity,products = [], addToCart}) => {
    const navigate = useNavigate();
    
const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

// Logic for related products
const cartCategoryIds = [...new Set(cart.map(item => item?.category?.id))];
const cartProductsIds = cart.map(item => item.id);
const relatedProducts = products.filter(
    product => cartCategoryIds.includes(product?.category?.id) && !cartProductsIds.includes(product.id)
);

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

        {/* --- RELATED PRODUCTA SECTION --- */}
        {relatedProducts.length > 0 && (
            <div style={{marginTop:"50px",borderTop:"2px solid #eee",paddingTop:"20px"}}>
                <h3>Related Products ⚡ </h3>
                <div style={{display:'flex',gap:"20px", flexWrap:"wrap",marginTop:"20px"}}>
                         {relatedProducts.map((product) =>  (
                            <div key={product.id} style={{border:"1px solid #ddd",borderRadius:"5px",padding:"10px",width:"160px", textAlign:"center"}}> 
                            <img src={product.imageurl || "https://via.placeholder.com/150"}
                            alt={product.name}
                            style={{width:"100%", height:"120px",objectFit:"cover"}} />
                            <h4 style={{margin:"10px 0 5px 0" }}> {product.name}</h4>
                            <p style={{color:"gray",fontSize:"14px",margin:"0 0 10px 0"}}>{product.price}</p>
                            <button onClick={() => addToCart(product)} style={{width:"100%",padding:"8px",background:"#007bff",color:"white",border:"none", borderRadius:"3px",cursor:"pointer"}}> Add to Cart</button>

                            </div>
                         ))}
                </div>    
            </div>
        )}
    </div>
);
};
export default Cart;