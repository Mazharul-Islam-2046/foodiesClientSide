import { api } from "./axiosInstance";

const usersApi = {
  login: (credentials) => {
    return api.post("/users/auth/login", credentials);
  },
  
  register: (credentials) => {
    return api.post("/users/auth/register", credentials);
  }
};


export default usersApi;