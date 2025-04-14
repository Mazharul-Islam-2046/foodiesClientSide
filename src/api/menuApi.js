import { api } from "./axiosInstance";

// Menu API functions
export const menuApi = {
  getAllMenu: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getAllMenuItems?page=${page}&limit=${limit}`);
  },
  
  getHealthyItems: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getFilterMenuItems?page=${page}&limit=${limit}sortBy=${"popularity"}`, {
      params: {
        isHealthy: true
      }
    });
  },

  filterMenuItems: (page = 1, limit = 10, filters = {}) => {
    return api.get(`/menuItems/getFilterMenuItems?page=${page}&limit=${limit}&sortBy=${filters.sortBy}`, {
      params: {
        ...filters
      }
    });
  },

  getPopularMenuItems: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getFilterMenuItems?page=${page}&limit=${limit}`, {
      params: {
        isPpopular: true
      }
    });
  },

  getCategories: () => {
    return api.get("/menuItems/fetchCategories");
  }
};