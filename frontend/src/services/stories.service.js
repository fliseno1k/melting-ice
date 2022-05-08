import { axiosInstance } from './config';


const servicePrefix = '/story';

export const StoriesService = {
    async getStories() {
        return axiosInstance.get(servicePrefix);
    },
    async getStoryById(id) {
        return axiosInstance.get(servicePrefix + `/${id}`);
    }
};