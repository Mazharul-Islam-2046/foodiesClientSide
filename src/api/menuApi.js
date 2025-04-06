import { api } from "./axiosInstance";

// Menu API functions
export const menuApi = {
  getAllMenu: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getAllMenuItems?page=${page}&limit=${limit}`);
  },
  
  getHealthyItems: (page = 1, limit = 10) => {
    return api.get(`/menuItems/filterMenuItems?page=${page}&limit=${limit}`, {
      params: {
        page,
        limit,
        isHealthy: true
      }
    });
  },

  filterMenuItems: (page = 1, limit = 10, filters = {}) => {
    return api.get(`/menuItems/getFilteredMenuItems?page=${page}&limit=${limit}`, {
      params: {
        page,
        limit,
        ...filters
      }
    });
  },

  getPopularMenuItems: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getPopularMenuItems?page=${page}&limit=${limit}`);
  },
};