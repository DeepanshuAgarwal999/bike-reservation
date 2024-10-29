import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10 * 60 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("auth")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const { contentType } = config.headers;

    if (contentType) {
      config.headers["Content-Type"] = contentType;
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
