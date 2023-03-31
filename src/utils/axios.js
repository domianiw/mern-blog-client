import axios from 'axios';

//const server = 'http://localhost:3002';
//const REACT_APP_URL = 'http://localhost:3002';
const REACT_APP_URL = process.env.REACT_APP_URL;

const instance = axios.create({
  baseURL: REACT_APP_URL,
});
//будет добавляться проверка во всех запросах axios, что есть токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
export { REACT_APP_URL };
//export { server };
