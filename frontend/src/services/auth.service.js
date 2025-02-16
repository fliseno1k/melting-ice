import { axiosInstance } from './config';


const servicePrefix = '/auth';

export const AuthService = {
    async login(password) {
        return axiosInstance.post(`${servicePrefix}/login`, { 
            password
        });
    },
    async refreshRequest() {
        return axiosInstance.get(`${servicePrefix}/refresh`);
    },
    async checkAuthorization() {
        return axiosInstance.get(`${servicePrefix}/user`, {
            token: localStorage.getItem("jwt_access")
        });
    }
};