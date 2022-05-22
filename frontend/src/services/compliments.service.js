import { axiosInstance } from './config';


const servicePrefix = '/compliment';

export const ComplimentsService = {
    async getCompliment() {
        return axiosInstance.get(servicePrefix);
    },
    async addCompliment(data) {
        return axiosInstance.post(servicePrefix, data);
    }
};