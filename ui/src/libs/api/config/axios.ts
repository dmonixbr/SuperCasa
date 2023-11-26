import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: `http://127.0.0.1:5000/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axiosInstance;
