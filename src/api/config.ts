import axios from "axios";
const service = axios.create({
  baseURL: "https://bemanage.onrender.com/api" || "http://localhost:8080/api",
  timeout: 5000,
});
export default service;
//https://bemanage.onrender.com/api
