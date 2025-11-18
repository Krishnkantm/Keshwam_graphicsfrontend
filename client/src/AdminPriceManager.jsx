import React, { useState, useEffect } from "react";
import axios from "axios";
import API from './apiBase.jsx'; // ensure axios.defaults.baseURL is set
// const API = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}:5000`;

import "./AdminPriceManager.css";

export default function AdminPriceManager() {
  const [prices, setPrices] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const token = localStorage.getItem("kg_token");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get('/api/prices');
    setPrices(res.data);
  };

  const updatePrices = async (updated) => {
    await axios.put('/api/admin/prices', updated, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPrices(updated);
  };

  const addItem = () => {
    if (!newItem.name || !newItem.price) return alert("Enter name & price");
    const updated = [...prices, newItem];
    updatePrices(updated);
    setNewItem({ name: "", price: "" });
  };

  const deleteItem = (index) => {
    const updated = prices.filter((_, i) => i !== index);
    updatePrices(updated);
  };

  const editPrice = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    updatePrices(updated);
  };

  return (
    <div className="price-admin-box">
      <h2>Manage Price List</h2>

      <div className="add-box">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price Range"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <table className="price-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, i) => (
            <tr key={i}>
              <td>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => editPrice(i, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={p.price}
                  onChange={(e) => editPrice(i, "price", e.target.value)}
                />
              </td>
              <td>
                <button className="del" onClick={() => deleteItem(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
