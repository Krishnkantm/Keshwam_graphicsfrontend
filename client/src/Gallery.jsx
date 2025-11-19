import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
// const API = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}:5000`;

export default function Gallery(){
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(()=>{ axios.get('/api/media').then(r=>setItems(r.data)); },[]);

  const displayed = items.filter(i => filter==='all'? true : i.category===filter);

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1 className="rainbow-text">Keshwam Graphic</h1>

          <p>Creative Prints, Unique Expressions</p>
        </div>
        <div className="hero-image" />
      </section>

      <div className="controls">
        <label>Filter:</label>
        <select value={filter} onChange={e=>setFilter(e.target.value)}>
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

      <div className="grid">
        {displayed.length===0 && <div className="empty">No items yet.</div>}
        {displayed.map(it=>(
          <div className="card" key={it._id}>
            {it.mimeType && it.mimeType.startsWith('video') ? (
              <video controls className="media" src={it.url} />
            ) : (
              <img className="media" src={it.url} alt={it.originalName} />
            )}

            <div className="card-body" style={{padding:"8px"}}>
              <div className="title" style={{fontWeight:"700", fontSize:"16px", color:"var(--dark)"}}>
                {it.title || it.originalName}
              </div>

              <div className="price" style={{
                margin:"6px 0",
                padding:"6px 10px",
                background:"transparent",
                color:"#000",
                display:"inline-block",
                borderRadius:"6px",
                fontWeight:"600"
              }}>
                ₹ {it.price}
              </div>

              <div className="cat" style={{color:"var(--muted)", fontSize:"12px"}}>
                {it.category}
              </div>

              <div className="date" style={{marginTop:"4px", fontSize:"12px", color:"#7487a3"}}>
                {new Date(it.uploadedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
