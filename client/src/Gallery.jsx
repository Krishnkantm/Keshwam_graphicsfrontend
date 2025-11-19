import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from './apiBase.jsx';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState(null); // zoom popup

  useEffect(() => {
    axios.get('/api/media').then(r => setItems(r.data));
  }, []);

  const displayed = items.filter(i => filter === 'all' ? true : i.category === filter);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="rainbow-text">Keshwam Graphic</h1>
          <p>Creative Prints, Unique Expressions</p>
        </div>
        <div className="hero-image" />
      </section>

      {/* FILTER */}
      <div className="controls">
        <label>Filter:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
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
      <div className="grid">
        {displayed.length === 0 && <div className="empty">No items yet.</div>}

        {displayed.map(it => (
          <div className="card" key={it._id}>

            {/* CLICK TO OPEN PREVIEW */}
            {it.mimeType && it.mimeType.startsWith('video') ? (
              <video
                className="media"
                src={it.url}
                onClick={() => setPreview({ type: 'video', src: it.url })}
                style={{ cursor: "zoom-in" }}
                controls
              />
            ) : (
              <img
                className="media"
                src={it.url}
                alt={it.originalName}
                onClick={() => setPreview({ type: 'image', src: it.url })}
                style={{ cursor: "zoom-in" }}
              />
            )}

            <div className="card-body">
              <div className="title">{it.title || it.originalName}</div>

              <div className="price">₹ {it.price}</div>

              <div className="cat">{it.category}</div>

              <div className="date">
                {new Date(it.uploadedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ZOOM POPUP */}
      {preview && (
        <div className="zoom-overlay" onClick={() => setPreview(null)}>
          {preview.type === "image" ? (
            <img src={preview.src} className="zoom-media" />
          ) : (
            <video src={preview.src} controls autoPlay className="zoom-media" />
          )}
        </div>
      )}
    </div>
  );
}
