import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crio-location-selector.onrender.com", // replace with your API base URL
  timeout: 10000, // optional, specifies a timeout for the request
  headers: { "Content-Type": "application/json" }, // optional, default headers
});

export default axiosInstance;
