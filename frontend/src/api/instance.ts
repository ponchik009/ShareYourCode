import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8001/api",
  withCredentials: true,
});

export default instance;
