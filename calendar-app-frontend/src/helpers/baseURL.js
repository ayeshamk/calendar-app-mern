import axios from 'axios';
import { store } from '../store/index';

export const baseURL = axios.create({
    baseURL:'http://localhost:8001'
});

baseURL.interceptors.request.use(function (config) {
    const token = store.getState()?.auth?.token;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
