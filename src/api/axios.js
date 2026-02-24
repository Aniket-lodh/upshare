import axios from "axios";

if (!import.meta.env.VITE_SERVER) {
  throw new Error("VITE_SERVER is not defined in environment variables.");
}

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Response interceptor — dispatch event on 401, let app handle cleanup
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(
        new CustomEvent("unauthorized", {
          detail: { message: "Session expired. Please login again." },
        })
      );
    }
    return Promise.reject(error);
  }
);

// Dev API console inspector — controlled via VITE_DEBUG_API flag
if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_API === "true") {
  api.interceptors.request.use((config) => {
    console.groupCollapsed(
      `%c[API] ${config.method?.toUpperCase()} ${config.url}`,
      "color: #6366f1; font-weight: bold"
    );
    if (config.data) console.log("Payload:", config.data);
    console.groupEnd();
    return config;
  });

  api.interceptors.response.use(
    (res) => {
      console.groupCollapsed(
        `%c[API] ✓ ${res.status} ${res.config.method?.toUpperCase()} ${
          res.config.url
        }`,
        "color: #22c55e; font-weight: bold"
      );
      console.log("Response:", res.data);
      console.groupEnd();
      return res;
    },
    (err) => {
      console.groupCollapsed(
        `%c[API] ✗ ${
          err.response?.status || "NETWORK"
        } ${err.config?.method?.toUpperCase()} ${err.config?.url}`,
        "color: #ef4444; font-weight: bold"
      );
      console.error("Error:", err.response?.data || err.message);
      console.groupEnd();
      return Promise.reject(err);
    }
  );
}

export default api;
