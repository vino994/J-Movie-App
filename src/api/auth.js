  // src/api/auth.js
  import axios from "axios";

  const BASE = "https://authen-eytd.onrender.com/api/auth";


  export const api = axios.create({
    baseURL: BASE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // add JWT token to axios
  export const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };
  export const resetPasswordApi = (token, data) =>
    api.post(`/reset-password/${token}`, data);
