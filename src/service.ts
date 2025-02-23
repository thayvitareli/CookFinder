import axios from "axios";

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 30000,
});

export default api;