// import React, { useEffect, useState,useMemo } from 'react';
// import Card from "./Card.jsx";
// import axios from 'axios';
// import API from './apiBase.jsx';

// export default function Gallery() {
//   const [items, setItems] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [preview, setPreview] = useState(null); // zoom popup

//   useEffect(() => {
//     axios.get('/api/media').then(r => setItems(r.data));
//   }, []);

//   const displayed = useMemo(() => {
//   return items.filter(i =>
//     filter === "all" ? true : i.category === filter);
// }, [items, filter]);

//   return (
//     <div>
//       {/* HERO */}
//       <section className="hero">
//         <div className="hero-text">
//           <h1 className="rainbow-text">Keshwam Graphic</h1>
//           <p>Creative Prints, Unique Expressions</p>
//         </div>
//         <div className="hero-image" />
//       </section>

//       {/* FILTER */}
//       <div className="controls">
//         <label>Filter:</label>
//         <select value={filter} onChange={e => setFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="patrika">Patrika</option>
//           <option value="invitation">Invitation Cards</option>
//           <option value="plate">Number Plate</option>
//           <option value="photo-frame">Photo Frames</option>
//           <option value="flex">Flex Banner</option>
//           <option value="sticker">Bike Stickers</option>
//           <option value="video">Videos/Reels</option>
//         </select>
//       </div>

//       {/* GRID */}
//       <div className="grid">
//         {displayed.length === 0 && <div className="empty">No items yet.</div>}

//         {displayed.map(it => (
//            <Card key={it._id} it={it} setPreview={setPreview} />
//         ))}
//       </div>

//       {/* ZOOM POPUP */}
//       {preview && (
//         <div className="zoom-overlay" onClick={() => setPreview(null)}>
//           {preview.type === "image" ? (
//             <img src={preview.src} className="zoom-media" />
//           ) : (
//             <video src={preview.src} controls autoPlay className="zoom-media" />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState, useMemo } from 'react';
import Card from "./Card.jsx";
import axios from 'axios';
import API from './apiBase.jsx';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState(null); // zoom popup
  const [currentPage, setCurrentPage] = useState(1); // 🟢 current page

  const itemsPerPage = 10; // 🟢 number of items per page

  useEffect(() => {
    axios.get('/api/media').then(r => setItems(r.data));
  }, []);

  const displayed = useMemo(() => {
    return items.filter(i =>
      filter === "all" ? true : i.category === filter
    );
  }, [items, filter]);

  // 🟢 Pagination: calculate items for current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = displayed.slice(indexOfFirst, indexOfLast);

  // 🟢 Total pages
  const totalPages = Math.ceil(displayed.length / itemsPerPage);

  // 🟢 Page navigation handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

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
      <div className="grid">
        {currentItems.length === 0 && <div className="empty">No items yet.</div>}

        {currentItems.map(it => (
          <Card key={it._id} it={it} setPreview={setPreview} />
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