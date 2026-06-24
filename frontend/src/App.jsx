import { useState , useEffect } from 'react';
import axios from 'axios';


function App() {
  const[products ,setProducts] = useState([]);
  const[productName, setProductName] = useState(" ");

  // Getting prodcts from live backend
  const fetchProducts = () => {
    axios.get('https://java-ecommerce.onrender.com/api/products')
    .then((res) => setProducts(res.data))
    .catch((err) => console.error("Error fetching products:", err));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new products
  const handleAddProducts = (e) => {
    e.preventDefault();
    if (!productName) return;

    axios.post('https://java-ecommerce.onrender.com/api/products',{
      name: productName
    })
    .then(() => {
      setProductName('');
      fetchProducts();  // Instant list refresh 
    })
    .catch((err) => console.error("Error adding products",err));
  };

  return (
    <div style={{maxWidth:'500px', margin: '50px auto',padding: '20px',border: '1px solid #ddd',borderRadius: '8px', boxShadow:' 0 4px 6px rgba(0,0,0,0.1'}}>
      <h2 style={{textAlign:'center',color:'#333' }}> 🛒 Product management (Live)</h2>
      {/*Adding project form */}
      <form onSubmit={handleAddProducts} style={{display: 'flex', gap:'10px',marginBottom: '20px'}}>
        <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} style={{flex: 1, padding: '10px',borderRadius:'4px',border: '1px solid #ccc'}}
        />
        <button type="submit" style={{padding:'10px 15px', background:'#007bff',color:'#fff',border:'none',borderRadius:'4px',cursor:'pointer',fontWeight:'bold'}}>
          Add
        </button>
      </form>
      {/* List of Products*/}
      <h3 style={{ color:'#555'}}>Available Products:</h3>
      {products.length === 0 ? (
        <p style={{color:'#888'}}>No proucts found.Add one above!</p>):
        (
          <ul style={{listStyleType:'none',padding: 0}}>
{products.map((prod,index) => (
            <li key={index} style={{display:'flex',justifyContent:'space-between',padding:'12px 20px' ,fontSize:'16px',background:' #fff',margin:'15px 0',border:'1px solid #ccc',borderRadius:'10px',marginBottom:'12px'}}>
              <span style={{fontWeight:'600', color:'#1e293b',textTransform:'capitalize'}}>{prod.name}</span>
              <span>{prod.category ? prod.category.name :'Electroincs'}</span>

             {/* RAW DATA: <code>{JSON.stringify(prod)}</code> */}
            </li>
          ))}</ul>
      )}
    </div>
  );

}

export default App
