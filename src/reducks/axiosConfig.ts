import axios from 'axios';

axios.defaults.withCredentials = true;

export const accountServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_ACCOUNT_API_HOST,
});

export const userServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_HOST,
});

export const todoServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_TODO_API_HOST,
});
