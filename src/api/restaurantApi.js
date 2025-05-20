import { api } from "./axiosInstance";


export const restaurantApi = {
    getRestaurant: (id, page = 1, limit = 10) => {
        return api.get(`/restaurant/getRestaurant/${id}?page=${page}&limit=${limit}`);
    },

    getAllRestaurants: (page = 1, limit = 10) => {
        return api.get(`/restaurant/getAllRestaurants?page=${page}&limit=${limit}`);
    }
}