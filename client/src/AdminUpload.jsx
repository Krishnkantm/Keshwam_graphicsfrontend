import React, { useState } from "react";
import axios from "axios";
import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
// const API = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}:5000`;
import "./adminStyle.css"

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);

    try {
      await axios.post('/api/admin/upload', formData, {
         headers: { 
           "Content-Type": "multipart/form-data",
           Authorization: "Bearer " + localStorage.getItem("token") // ✅ ADD THIS
        }
     });


      alert("Upload Successful ✅");
      setFile(null);
      setTitle("");
      setCategory("");
      setPrice("");
    } catch (err) {
      console.log(err);
      alert("Upload Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <br />

      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <br />

      <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      <br />

      <input type="text" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      <br />

      <button 
        onClick={handleUpload} 
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {loading && <p>Uploading, please wait...</p>}
    </div>
  );
}
