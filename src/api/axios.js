import axios from "axios";

if (!import.meta.env.VITE_SERVER) {
  throw new Error("VITE_SERVER is not defined in environment variables.");
}

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Response interceptor — dispatch event on 401, let app handle cleanup
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(error);
  }
);

export default api;
