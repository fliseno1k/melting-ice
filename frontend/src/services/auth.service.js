import { axiosInstance } from './config';


const servicePrefix = '/auth';

export const AuthService = {
    async login(password) {
        return axiosInstance.post(`/${servicePrefix}/login`, { 
            password 
        });
    },
    async checkAuthorization(token) {
        return axiosInstance.get(`/${servicePrefix}/user`, {
            headers: {
                token
            }
        });
    }
};