import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './apiBase.jsx';
import Gallery from './Gallery';
import AdminLogin from './AdminLogin.jsx';
import AdminPanel from './AdminPanel.jsx';
import PriceList from "./PriceList.jsx";
import AdminPriceManager from "./AdminPriceManager.jsx";
import './styles.css';
export default function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="brand">
          <div className="brand">
             <div className="brand">
  <div className="logo-box luxe">KG</div>
  <div>
    <div className="shop-name">Keshwam Graphic</div>
    <div className="tagline">Creative Prints, Unique Expressions</div>
  </div>
</div>
           </div>

        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/api/prices" className="nav-item">Prices</Link>
          <Link to="/admin" className="nav-item">Admin</Link>
        </nav>
      </header>
      <main className="main-container">
        <Routes>

          {/* Home: Show Gallery + PriceList only */}
          <Route path="/" element={
            <div className="home-layout">
              <div className="gallery-panel">
                <Gallery />
              </div>
              {/* <aside className="price-panel">
                <PriceList />
              </aside> */}
            </div>
          } />

          <Route path="/api/prices" element={<PriceList />} />

          {/* Admin Login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin Panel (only accessible after login) */}
          <Route path="/admin/panel" element={
                 <AdminPanel />
            } />

          {/* Admin Price Manager Page (only admin should see this) */}
          <Route path="/admin/manage-prices" element={
            localStorage.getItem("kg_token")
              ? <AdminPriceManager />
              : <AdminLogin />
          } />

        </Routes>
      </main>
<footer className="site-footer">
  <div className="footer-container">
    <div className="footer-section about">
      <h2 className="footer-logo">KG</h2>
      <p>Keshwam Graphic — your destination for creative prints and unique expressions. We specialize in Patrika, Invitations, Number Plates, Photo Frames & more.</p>
    </div>

    {/* <div className="footer-section links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/api/prices">Price</a></li>
      </ul>
    </div> */}

    <div className="footer-section contact">
      <h3>Contact Us</h3>
      <p>📍location-neem chock bazar kukdeshwar</p>
      <p>📞 +91 8370079435 (Ujjwal Modi 📱)</p>
      <p>📞 +91 8085353760 (Navin Modi 📱)</p>
      <p>📧 keshwamgraphics@gmail.com</p>
    </div>

    <div className="footer-section social">
  <h3>Follow Us</h3>
  <div className="social-icons">
    <a href="https://api.whatsapp.com/message/NQJOHGLTC4DVP1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-whatsapp"></i> Whatsapp
    </a>
    <a href="https://www.instagram.com/keshwamgraphics/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i> Instagram (keshwamgraphics)
    </a>
    <a href="https://www.instagram.com/keshwam_edits/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i> Instagram (keshwam_edits)
    </a>
    <a href="https://www.instagram.com/ujjwal_modi_/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i> Instagram (Ujjwal Modi)
    </a>
    <a href="https://www.instagram.com/_nvn_modi_/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i> Instagram (Navin Modi)
    </a>
  </div>
</div>
  </div>
  <div className="footer-bottom">
  <p>
    © {new Date().getFullYear()} Keshwam Graphic | Designed with 💛 in India <br />
    <span className="dev-credit">Developed by <strong>Krishnkant Modi 💻</strong></span>
  </p>
</div>

</footer>

    </BrowserRouter>
  );
}
