import axios from 'axios';
import { auth } from '../configs/firebase';

export default function useAxios() {
  const server = axios.create({
    baseURL: 'http://localhost:8000/',
  });

  server.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return server;
}
