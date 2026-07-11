import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';


const API_URL = 'https://java-ecommerce-full-stack.onrender.com/api/products';


function Home() {
     const navigate = useNavigate();

     //Getting login user data from local stoge
     const user = JSON.parse(localStorage.getItem("user"));

     const [cart,setCart] = useState([]);

     const [products,setProducts]= useState([]);
     const [search,setSearch] = useState('');

     
     const[showAdminForm,setshowAdminForm] =useState(false);

     const [form, setForm] = useState({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageurl: '',
      category: {id: 1} 
     });
     
     //for getting data form backend
     const fetchProducts = async () =>{
      try{
         const response = await axios.get(`${API_URL}?search =${search}`);
         setProducts(response.data);
      }catch(error) {
         console.error("error fetching data",error);
      }
     };

     //..When anything type on search box it trigers or run again!...
     useEffect(() => {
      fetchProducts();
     },[search]);

     
     const handleChange = (e) => {
      const {name,value} = e.target;
      if (name === 'categoryId') {
         setForm({ ...form,category: {id: parseInt(value) } });
      } else {
         setForm({ ...form, [name]: value});
      }
     };

     //converting image to text (base64 string)
     const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {

         //create converter or scann tool to any files (pdf,imgages,etc) to changes  INTO "....RAW DATA.." 
         const reader = new FileReader();

         reader.onloadend = () => {
            setForm({...form,imageurl: reader.result});
         };

         //start the scan and translate img into masive string text
         reader.readAsDataURL(file);
         
      }
     };
      
      //..Add New Products...
      const handleAddProduct = async (e) => {
         e.preventDefault();
         if (!form.name || !form.price) return alert("Name and Price are required ") ;
         try {
            await axios.post(API_URL, form);
            alert("Products successfully add in DB..");
            //clear the form again 
            setForm({ name:'',description:'', price: '',stock:'',imageurl:'',category:{id:1} });
            setshowAdminForm(false);
            fetchProducts(); //for instatnt refresh or update list instantly.....
         } catch(error) {
            console.error("Error adding products",error);
         }
         };
         
         //🗑️
         const handleDelete = async (id) => {
            if (window.confirm("Would you really want to delete this product")) {
               try{
                  await axios.delete(`${API_URL}/${id}`);
                  fetchProducts();
               } catch(error) {
                  console.error("Error deleting product",error);
               }
               }
            };
         
      
     const handleAddToCart = (product) => {
        setCart([...cart, product]);
        alert(` ${product.name} added to the cart!`);
     };

     //..! LOGIN required...for buying anything..
     const handleBuyNow = (productName) => {
        if (!user) {
            //stop the user if its not login
            alert("Before buying this products you should login or signup! ");
            navigate("/login");
        } else {
            alert(` congrats ${user.name || user.email}!you successfull buying ${productName} products! `);
        }
     };
     const handleLogout = () => {
      localStorage.removeItem("user");
      window.location.reload(); //Refreshing page to cleaning state
     };
     return (
      <div style={{padding:"20px",fontFamily:"sans-serif",backgroundColor:"#f8f9fa",minHeight:"100vh"}}>
         {/*...... Top Navigation bar (Header).....*/ }
         <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"2px solid #e0e0e0",paddingBottom:"15px",backgroundColor:"white",padding:"15px 20px ",borderRadius:"8px",boxShadow:"0 2px 4px rgba(0,0,0,0.5"}} >
            <h2 style={{margin:"0",color:"#333"}}>My-ecommmerce store</h2>
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
               {/* Cart count */}
               <span style={{fontSize:"16px",fontWeight:"600",color:"#555" }}>
                  cart ({cart.length})
               </span>

               {/* login /logout dynamic*/}
               {user ? (
                  <div style={{display:"flex",alignItems: "center",gap:"15px"}}>
                     {user.role === "ADMIN" && (
                        <button onClick={() => setshowAdminForm(!showAdminForm)}
                        style={{padding:"8px 15px",backgroundColor:"#ffc107",color:"black",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"bold",marginRight:"10px"}}>{showAdminForm ? " Close Form":"👑Add Product form"}</button>
                     )}
                     <span style={{ fontWeight:"bold",color:"#007bff"}}>Hello,{user.name}</span>
                     <button onClick={handleLogout} style={{ padding:"8px 15px",backgroundColor:"#dc3545",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"}}>
                        Logout
                     </button>
                  </div>
               ):(
                  <button onClick={() => navigate("/login")} style={{padding:"8px 15px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"}}>Login</button>

               )}
         </div>
      </div>

                        {/*........ Live search bar -*/}
      <div style={{ marginTop:"20px"}}>
         <input 
         type="text" placeholder="🔍 Seach Products here.." value={search} onChange={(e) => setSearch(e.target.value)} style={{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid #ccc",boxSizing:"border-box",fontSize:"16px"}}/>
      </div>  

      {/* ADD Product form only for admin user when he click btn..*/}
      {user && user.role === 'ADMIN' && showAdminForm && (
         <form onSubmit={handleAddProduct} style={{display:"flex",flexDirection:"column",gap:"12px",padding:"20px",border:"1px solid #ddd", borderRadius:"10px",backgroundColor:"#fff",boxShadow: `0 4px 6px rgba(0,0,0,0.05)`,marginTop:"20px",maxWidth:"500px"}}>
            <h3 style={{margin:"0 0 10px 0",color: "#007bff" }}>Add New Product to Database</h3>
            <input type="text" placeholder="Product name" name="name" value={form.name} onChange={handleChange} required style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc"}} />
            <input type="text" placeholder="Product description" name="description" value={form.description} onChange={handleChange} required style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc"}} />
            <input type="number" placeholder="Price" name="price" value={form.price} onChange={handleChange} required style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc"}} />
            <input type="number" placeholder="Stock" name="stock" value={form.stock} onChange={handleChange} required style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc"}} />
            <input type="file" accept="image/*"   onChange={handleFileChange} required style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc"}} />

            <label style={{fontWeight:"bold",fontSize:"14px",color:'#555',}}>Select Category:</label>
            <select name="categoryid" onChange={handleChange} style={{padding:"10px",borderRadius:"5px",border:"1px solid #ccc",backgroundColor:"#fff"}}>
               <option value="1">Electronics</option>
               <option value="2">Clothing</option>
               <option value="3">Book</option>
            </select>
            <button type='submit' style={{padding:"12px", background:"#28a745",color:"white",border:"none",borderRadius:"6px",cursor:'pointer',fontWeight:"bold",fontSize:"16px"}}>Uploaded to backend</button>
         </form>
      )}                

                   {/* ...Products display section */}
               <h3 style={{marginTop:"40px",color:"#444",borderLeft:"5px solid #007bff",paddingLeft:"10px"}}>Our Best Products</h3>
               {products.length === 0 ? <p style={{color:"#888",textAlign:"center"}}>No Products found..</p>:(

               
               <div style={{display:"flex",flexWrap:"wrap",gap:"25px",marginTop:"20px"}}>
                  {products.map((product) => (
                     <div key={product.id} style={{border:"1px solid #e0e0e0",padding:"20px",borderRadius:"10px",width:"260px",  backgroundColor:"white",boxShadow:" 0 4px 6px rgba(0,0,0,0.02)",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <img 
                        src={product.imageurl || 'https://via.placeholder.com/200?text=No+Image'}
                        alt={product.name}
                        style={{width:"100%",height:'180px',objectFit:"cover",borderRadius:'10px',width:"250px",display:"flex",flexDirection:"column",justifyContent:"space-between",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,0.06"}}/>

                        <div>
                           <h4 style={{ margin: "0 0 10px 0",color:"#222",fontSize:"18px"}}>{product.name}</h4>
                           <p style={{fontSize:"14px",color:"#666",minHeight:"40px"}}>{product.desc}</p>
                           <p style={{fontSize:"20px",color:"#28a745",fontWeight:"bold",margin:"15px 0"}}>{product.price}</p>
                        </div>  
                        
                        {user && user.role === 'ADMIN' ?(

                              <button onClick={() => handleDelete(product.id)} style={{width: "100%", padding:"10px",backgroundColor:"#28a745", color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"}}>
                              Delete Product
                           </button>            
                           ) :(
                              <>

                           {/*Add to cart button*/}
                           <button onClick= {() => handleAddToCart(product)} style={{width:"100%",padding:"10px",backgroundColor:"#ffc107",color:"#333",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"}}>
                              Add to cart
                           </button>
                           
                           {/* Buy now btn- Only for login users */}
                           <button onClick={() => handleBuyNow(product.name)} style={{width: "100%", padding:"10px",backgroundColor:"#28a745", color:"white",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"}}>
                              Buy Now
                           </button>  
                           </>
                           
                  )}         
                          
                        </div>
                     

                  ))}
               </div>    )}
            
      </div>
     );
}

export default Home;