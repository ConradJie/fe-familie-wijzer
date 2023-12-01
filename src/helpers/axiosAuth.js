import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosAuth = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
