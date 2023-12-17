import axios from 'axios';

const token=localStorage.getItem('token');

export const axiosAuth = axios.create({
    baseURL: `${import.meta.env.VITE_BASEURL}`,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
