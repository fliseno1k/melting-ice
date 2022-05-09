import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true
});