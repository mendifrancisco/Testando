import axios from "axios";

const api = axios.create({
  baseURL: "http://35.238.72.79:8001/",
  // baseURL: "http://localhost:8001/"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  // console.log("🔐 Token adicionado ao header:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
