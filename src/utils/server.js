import axios from 'axios';
import { auth } from '../configs/firebase';

const baseURL = import.meta.env.VITE_SERVER_URL;

const serverSecured = axios.create({
  baseURL,
  withCredentials: true,
});

serverSecured.interceptors.request.use(async (config) => {
  const user = auth?.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const server = axios.create({
  baseURL,
  withCredentials: true,
});

export default function serverAPI(secured = true) {
  return secured ? serverSecured : server;
}
