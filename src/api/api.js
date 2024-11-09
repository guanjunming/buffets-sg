import axios from "axios";

const SERVER_BASE_URL = "http://localhost:5001/api";

const api = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const signup = async (userData) => {
  try {
    const response = await api.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default api;
