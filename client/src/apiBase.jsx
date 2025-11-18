import axios from 'axios';

// Read environment variable (Vite uses import.meta.env)
const envApi = import.meta.env.VITE_API_URL;

// API resolve logic
let API;

if (envApi) {
  API = envApi; // Use .env value if provided
} else {
  // Fallback for local development
  API = `http://${window.location.hostname}:5000`;
}

// Debug log (optional)
window.__API_BASE__ = API;
console.info('[apiBase] resolved API base ->', API);

// Set axios default base URL
axios.defaults.baseURL = API;

export default API;
