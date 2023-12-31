import { QueryClient } from '@tanstack/react-query';
import Axios from 'axios';
import { getItem } from 'utils/storage';

export const authorizedQueryClient = new QueryClient();
export const unauthorizedQueryClient = new QueryClient();

const baseURL = 'http://212.64.215.163:8000';

export const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(
  async function (config) {
    const access_token = await getItem('access_token');

    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
