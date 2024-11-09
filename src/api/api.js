import axios from "axios";

const SERVER_BASE_URL = "http://localhost:5001/api";

const api = axios.create({
  baseURL: SERVER_BASE_URL,
});

export const login = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default api;
