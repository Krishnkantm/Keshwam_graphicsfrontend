import React, { useEffect, useState } from "react";
import axios from "axios";
import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
// const API = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}:5000`;

export default function PriceEditor(){
  const [prices, setPrices] = useState([]);

  useEffect(()=>{
    axios.get('/api/prices').then(r=>setPrices(r.data));
  },[]);

  const save = () => {
    const token = localStorage.getItem("kg_token");
    axios.put(`${API}/api/admin/prices`, prices, {
      headers:{ Authorization:`Bearer ${token}` }
    });
    alert("Prices Updated ✅");
  };

  return (
    <div className="center-card">
      <h3>Edit Price Table</h3>
      {prices.map((p,i)=>(
        <input 
          key={i}
          className="input"
          value={p.price}
          onChange={e=>{
            const list=[...prices];
            list[i].price = e.target.value;
            setPrices(list);
          }}
        />
      ))}
      <button className="btn" onClick={save}>Save Prices</button>
    </div>
  );
}
