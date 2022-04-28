import { axiosInstance } from './config';


const servicePrefix = '/compliment';

export const ComplimentsService = {
    async getCompliment() {
        return axiosInstance.get(servicePrefix);
    }
};