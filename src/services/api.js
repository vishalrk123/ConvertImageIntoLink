import axios from "axios";

const API = axios.create({
  baseURL: "https://foreverlink-backend.onrender.com/api",
});

export default API;