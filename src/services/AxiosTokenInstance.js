import axios from 'axios';
import store from '../store/store';
const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
    let params = new URLSearchParams();
    let token = store.getters[`auth_user_token`];
    params.append('auth', token);
    config.params = params;
    return config;
});

export default axiosInstance;