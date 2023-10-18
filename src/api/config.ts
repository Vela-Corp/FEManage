import axios from "axios";
const service = axios.create({
  baseURL: "http://localhost:8080/api" || "https://bemanage.onrender.com/api",
  timeout: 5000,
});
export default service;
//https://bemanage.onrender.com/api
