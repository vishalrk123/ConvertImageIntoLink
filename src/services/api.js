import axios from "axios";

const API = axios.create({
  baseURL: "https://foreverlink-s6lz.onrender.com/api",
});

export default API;
