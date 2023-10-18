import axios from "axios";
const service = axios.create({
  baseURL: "https://bemanage.onrender.com/api",
  timeout: 5000,
});
export default service;
