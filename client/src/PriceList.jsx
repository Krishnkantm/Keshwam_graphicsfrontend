import React, { useEffect, useState } from "react";
import axios from "axios";
import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
import "./priceListStyle.css"; 

export default function PriceList() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let mounted = true;
    axios.get(`${API}/api/prices`)
      .then(r => { if (mounted) setPrices(r.data || []); })
      .catch(() => { if (mounted) setPrices([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  },[]);

  return (
    <section className="pl-root">
      <header className="pl-header">
        <div>
          <h2 className="pl-title">Price List</h2>
          <p className="pl-sub">Transparent pricing for prints, frames and digital media</p>
        </div>
      </header>

      <div className="pl-grid">
        {loading && <div className="pl-empty">Loading prices…</div>}
        {!loading && prices.length === 0 && (
          <div className="pl-empty">No pricing available</div>
        )}

        {!loading && prices.map((p, i) => (
          <article className="pl-card" key={p._id || i}>
            <div className="pl-left">
              <div className="pl-name">{p.name}</div>
              {p.desc && <div className="pl-desc">{p.desc}</div>}
            </div>
            <div className="pl-price">₹ {typeof p.price === 'number' ? p.price.toLocaleString() : (p.price ?? p.priceRange ?? '—')}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
