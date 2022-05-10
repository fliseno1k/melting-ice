import { axiosInstance } from './config';


const servicePrefix = '/story';

export const StoriesService = {
    async getStories() {
        return axiosInstance.get(servicePrefix);
    },
    async getStoryById(id) {
        return axiosInstance.get(servicePrefix + `/${id}`);
    },
    async likeStory(id) {
        return axiosInstance.post(servicePrefix + `/${id}/like`);
    },
    async viewStory(id) {
        return axiosInstance.post(servicePrefix + `/${id}/view`);
    }
};