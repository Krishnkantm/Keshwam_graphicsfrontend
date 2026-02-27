// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import PriceEditor from "./PriceEditor.jsx";
// import AdminUpload from "./AdminUpload.jsx";
// import "./AdminPanelStyle.css";
// import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
// // const API = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}:5000`;

// export default function AdminPanel(){
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('patrika');
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const nav = useNavigate();

//   useEffect(()=>{ 
//     const token = localStorage.getItem('kg_token'); 
//     if(!token){ nav('/admin'); return; } 
//     fetchItems(); 
//   },[]);

//   const fetchItems = async ()=>{
//     const res = await axios.get(`${API}/api/media`);
//     setItems(res.data);
//   };

//   const upload = async ()=>{
//     if(!file || !title || !price){
//       return alert("Please fill Title, Price and choose File");
//     }

//     setLoading(true);

//     const form = new FormData();
//     form.append('file', file);
//     form.append('category', category);
//     form.append('title', title);
//     form.append('price', price);

//     const token = localStorage.getItem('kg_token');

//     try {
//       await axios.post('/api/admin/upload', form, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setFile(null);
//       setTitle("");
//       setPrice("");
//       fetchItems();
//       alert("✅ Upload Successful");
//     } catch(e){
//       alert("❌ Upload Failed");
//     }

//     setLoading(false);
//   };

//   const remove = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     const token = localStorage.getItem("kg_token");

//     try {
//       await axios.delete(`/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("✅ Deleted Successfully");
//       fetchItems();
//     } catch (err) {
//       console.log(err);
//       alert("❌ Delete Failed");
//     }
//   };

//   return (
//     <div className="admin-wrap">
//       <div style={{ textAlign:"center", marginBottom:"20px" }}>
//         <Link to="/admin/manage-prices">
//           <button className="btn" style={{ background:"rgb(212, 175, 55)", color:"black" ,width: "18%",marginTop: "10px" ,borderRadius:"10px"}}>
//             Manage Price List
//           </button>
//         </Link>
//       </div>
      
//       <div className='upload-panel'>
//           <div className="center-card">
//              <h2>Admin Panel - Upload</h2>

//              <input 
//                type="text" 
//                className="input" 
//                placeholder="Enter Title" 
//                value={title}
//                onChange={e=>setTitle(e.target.value)}
//              />

//              <input 
//                type="number" 
//                className="input" 
//                placeholder="Enter Price" 
//                value={price}
//                onChange={e=>setPrice(e.target.value)}
//              />

//              <select value={category} onChange={e=>setCategory(e.target.value)} className="input">
//                <option value="patrika">Patrika</option>
//                <option value="invitation">Invitation</option>
//                <option value="plate">Number Plate</option>
//                <option value="photo-frame">Photo Frames</option>
//                <option value="flex">Flex Banner</option>
//                <option value="sticker">Stickers</option>
//                <option value="video">Video</option>
//              </select>


//              <input type="file" onChange={e=>setFile(e.target.files[0])} className="input" />

//              <button className="btn" onClick={upload} disabled={loading}>
//                {loading ? "Uploading..." : "Upload"}
//              </button>
//            </div>
//       </div>

//       <div className="admin-list">
//         <h3>Uploaded Items</h3>
//         <div className="grid">
//           {items.map(it=>(
//             <div className="card" key={it._id}>
//               {it.mimeType && it.mimeType.startsWith('video') ? (
//                  <video controls className="media" src={it.url} />
//               ) : (
//                  <img className="media" src={it.url} alt={it.originalName} />
//               )}

//               <div className="card-body">
//                 <div className="name"><b>{it.title}</b></div>
//                 <div className="price" style={{color:"var(--blue)", fontWeight:"600"}}>₹ {it.price}</div>
//                 <div className="cat">{it.category}</div>
//                 <button className="btn small" onClick={()=>remove(it._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./AdminPanelStyle.css";
import API from './apiBase.jsx';
import Card from "./Card.jsx"; // Reuse your Card component if needed

export default function AdminPanel() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('patrika');
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('kg_token'); 
    if (!token) { nav('/admin'); return; } 
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/api/media`);
    setItems(res.data);
  };

  const upload = async () => {
    if (!file || !title || !price) {
      return alert("Please fill Title, Price and choose File");
    }

    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('category', category);
    form.append('title', title);
    form.append('price', price);

    const token = localStorage.getItem('kg_token');

    try {
      await axios.post('/api/admin/upload', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFile(null);
      setTitle("");
      setPrice("");
      fetchItems();
      alert("✅ Upload Successful");
    } catch (e) {
      alert("❌ Upload Failed");
    }

    setLoading(false);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    const token = localStorage.getItem("kg_token");

    try {
      await axios.delete(`/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Deleted Successfully");
      fetchItems();
    } catch (err) {
      console.log(err);
      alert("❌ Delete Failed");
    }
  };

  // Filtered items
  const displayed = useMemo(() => {
    return items.filter(i => filter === "all" ? true : i.category === filter);
  }, [items, filter]);

  // Pagination calculations
  const totalPages = Math.ceil(displayed.length / itemsPerPage);
  const paginatedItems = displayed.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

  return (
    <div className="admin-wrap">
      <div style={{ textAlign:"center", marginBottom:"20px" }}>
        <Link to="/admin/manage-prices">
          <button className="btn" style={{ background:"rgb(212, 175, 55)", color:"black" ,width: "18%",marginTop: "10px" ,borderRadius:"10px"}}>
            Manage Price List
          </button>
        </Link>
      </div>
      
      <div className='upload-panel'>
        <div className="center-card">
          <h2>Admin Panel - Upload</h2>

          <input 
            type="text" 
            className="input" 
            placeholder="Enter Title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input 
            type="number" 
            className="input" 
            placeholder="Enter Price" 
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <select value={category} onChange={e => setCategory(e.target.value)} className="input">
            <option value="patrika">Patrika</option>
            <option value="invitation">Invitation</option>
            <option value="plate">Number Plate</option>
            <option value="photo-frame">Photo Frames</option>
            <option value="flex">Flex Banner</option>
            <option value="sticker">Stickers</option>
            <option value="video">Video</option>
          </select>

          <input type="file" onChange={e => setFile(e.target.files[0])} className="input" />

          <button className="btn" onClick={upload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="controls" style={{ marginTop: "20px" }}>
        <label>Filter:</label>
        <select
          value={filter}
          onChange={e => { 
            setFilter(e.target.value); 
            setCurrentPage(1); // reset page when filter changes
          }}
        >
          <option value="all">All</option>
          <option value="patrika">Patrika</option>
          <option value="invitation">Invitation Cards</option>
          <option value="plate">Number Plate</option>
          <option value="photo-frame">Photo Frames</option>
          <option value="flex">Flex Banner</option>
          <option value="sticker">Bike Stickers</option>
          <option value="video">Videos/Reels</option>
        </select>
      </div>

      {/* GRID */}
      <div className="admin-list">
        <h3>Uploaded Items</h3>
        <div className="grid">
          {paginatedItems.map(it => (
            <div className="card" key={it._id}>
              {it.mimeType && it.mimeType.startsWith('video') ? (
                <video controls className="media" src={it.url} />
              ) : (
                <img className="media" src={it.url} alt={it.originalName} />
              )}

              <div className="card-body">
                <div className="name"><b>{it.title}</b></div>
                <div className="price" style={{color:"var(--blue)", fontWeight:"600"}}>₹ {it.price}</div>
                <div className="cat">{it.category}</div>
                <button className="btn small" onClick={() => remove(it._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION BUTTONS */}
        {displayed.length > itemsPerPage && (
          <div className="pagination" style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={prevPage} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}