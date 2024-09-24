import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER || "",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

