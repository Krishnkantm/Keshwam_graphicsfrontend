
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./adminStyle.css"
import './apiBase.jsx'; // ensure axios.defaults.baseURL is set and API base is logged

export default function AdminLogin(){
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const doLogin = async ()=>{
    setError('');
    setLoading(true);
    try{
      // use relative path so axios.defaults.baseURL (set by apiBase.js) is applied
      const res = await axios.post('/api/admin/login', { password: pass });
      if(res?.data?.token){
        localStorage.setItem('kg_token', res.data.token);
        nav('/admin/panel');
      } else {
        setError('Login failed: no token returned');
      }
    }catch(err){
      console.error('Login error', err);
      const msg = err.response?.data?.error || err.message || 'Login failed';
      setError(msg);
    }finally{ setLoading(false); }
  };

  return (
    <div className="main-container2">
      <div className="center-card">
        <h2>Admin Login</h2>
        <input className="input" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Admin password"/>
        <button className="btn" onClick={doLogin} disabled={loading}>{loading? 'Logging in…':'Login'}</button>
        {error && <div style={{color:'crimson', marginTop:8}}>{error}</div>}
        {/* <p className="hint">Default admin password: 1234 (change .env)</p> */}
      </div>
    </div>
  );
}
