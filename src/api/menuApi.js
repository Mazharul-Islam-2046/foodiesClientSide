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

  filterMenuItems: (page = 1, limit = 10, filters = {}, sortBy = "popularity") => {
    return api.get(`/menuItems/getFilterMenuItems?page=${page}&limit=${limit}&sortBy=${sortBy}`, {
      params: {
        ...filters
      }
    });
  },

  getPopularMenuItems: (page = 1, limit = 10) => {
    return api.get(`/menuItems/getFilterMenuItems?page=${page}&limit=${limit}sortBy=${"popularity"}`, {
      params: {
        isPpopular: true
      }
    });
  },

  getCategories: () => {
    return api.get("/menuItems/fetchCategories");
  },

  getMenuItemsByIds: (page = 1, limit = 10, ids = []) => {
    const idParams = ids.map(id => `ids[]=${id}`).join('&');
    return api.get(`/menuItems/getMenuItemsByIds?page=${page}&limit=${limit}&${idParams}`);
  }
};