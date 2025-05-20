import { api } from "./axiosInstance";


export const restaurantApi = {
    getRestaurant: (id, page = 1, limit = 10) => {
        return api.get(`/restaurant/getRestaurant/${id}?page=${page}&limit=${limit}`);
    },

    getAllRestaurants: (page = 1, limit = 10) => {
        return api.get(`/restaurant/getAllRestaurants?page=${page}&limit=${limit}`);
    },

    filterRestaurants: (page = 1, limit = 10, filters = {}, sortBy = "popularity") => {
    return api.get(`/restaurant/getFilterRestaurants?page=${page}&limit=${limit}&sortBy=${sortBy}`, {
      params: {
        ...filters
      }
    });
  },

  getUniqueRestaurantCategories: () => {
    return api.get("/restaurant/getUniqueCategories");
  },
}