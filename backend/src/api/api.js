import axios from "axios";

const API = axios.create({
  baseURL: "https://smartsplit-production-1b0a.up.railway.app/api",
});

export default API;