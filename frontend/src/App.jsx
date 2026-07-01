import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://java-ecommerce-full-stack.onrender.com/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  
  // combined state of form for all 
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageurl: '', 
    category: { id: 1 }
  });

  // 🔄 for getting data from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}?search=${search}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search]);

  // ⌨️ Single handler for changing all input boxes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoryId') {
      setForm({ ...form, category: { id: parseInt(value) } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleFileChange = (e) => {
    // Grab the  fisrt file user selected
    const file = e.target.files[0];
    if (file) {
      // Create a scanner tool or its Read raw files(images,pdf etc.)
       const reader = new FileReader();
       
       //this EVENT LISTNER define what happens when Scanning is fineshed
       reader.onloadend = () => {
        setForm({ ...form, imageurl: reader.result});
       };
       //start the scan or  read img  translate into masive string text known as (Base64 str)
       reader.readAsDataURL(file);
    }
  };

  // 📤  for Adding new products
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Name and Price are required!");
    try {
      await axios.post(API_URL, form);
      // clear the form again
      setForm({ name: '', description: '', price: '', stock: '', imageurl: '', category: { id: 1 } }); 
      fetchProducts(); // for instant refresh
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  // 🗑️ 
  const handleDelete = async (id) => {
    if (window.confirm("क्या आप सच में इस प्रोडक्ट को डिलीट करना चाहते हैं?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts(); // for instant refresh
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🛒 Advanced E-Commerce Panel</h2>

      {/* 🔍 Live search bar*/}
      <input 
        type="text" 
        placeholder="🔍 Search products here..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
      />

      {/* ➕ New product adding form*/}
      <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Add New Product</h3>
        <input type="text" name="name" placeholder="Product Name *" value={form.name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="number" name="price" placeholder="Price (₹) *" value={form.price} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="number" name="stock" placeholder="Stock Count" value={form.stock} onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="file" accept="image/*" onChange={handleFileChange} placeholder="Upload your product img"  style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Select Category:</label>
        <select name="categoryId" onChange={handleChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
          <option value="1">Electronics</option>
          <option value="2">Clothing</option>
          <option value="3">Books</option>
        </select>

        <button type="submit" style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Add Product</button>
      </form>

      {/* 📋 List of products */}
      <h3 style={{ marginTop: '25px', color: '#333' }}>Available Products:</h3>
      {products.length === 0 ? <p style={{ color: '#888', textAlign: 'center' }}>No products found!</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map(product => (
            <div key={product.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px', display: 'flex', gap: '15px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', backgroundColor: '#fff' }}>
              
              {/* 📸 Image of products */}
              <img 
                src={product.imageurl || 'https://via.placeholder.com/80?text=No+Image'} 
                alt={product.name} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #251e1e' }} 
              />
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '18px', color: '#222' }}>{product.name}</strong> 
                <span style={{ fontSize: '11px', background: '#e0e0e0', color: '#333', padding: '3px 8px', borderRadius: '4px', marginLeft: '10px', fontWeight: 'bold' }}>
                  {product.category?.name || 'General'}
                </span>
                <p style={{ margin: '6px 0', fontSize: '14px', color: '#666' }}>{product.description}</p>
                <div style={{ fontSize: '15px' }}>
                  <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>₹{product.price}</span> 
                  <span style={{ color: '#ccc', margin: '0 10px' }}>|</span> 
                  <span>Stock: {product.stock || 0}</span>
                </div>
              </div>
              
              <button onClick={() => handleDelete(product.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}