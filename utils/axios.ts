import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;