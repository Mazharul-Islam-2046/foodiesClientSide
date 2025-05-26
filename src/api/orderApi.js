import { api } from "./axiosInstance";

export const orderApi = {
    createOrder: (data) => api.post("/orders/createOrder", data),
    getOrders: (page = 1, limit = 10) => api.get(`/orders/?page=${page}&limit=${limit}`),
}