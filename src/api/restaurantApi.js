import { api } from "./axiosInstance";


export const restaurantApi = {
    getRestaurant: (id) => {
        return api.get(`/restaurant/getRestaurant/${id}`);
    },

    getAllRestaurants: () => {
        return api.get(`/restaurant/getAllRestaurants`);
    }
}