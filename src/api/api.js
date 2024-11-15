import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// instance for authentication
const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance with interceptors
const apiInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post("/signup", userData);
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    if (Array.isArray(message)) {
      throw new Error(message[0]);
    } else {
      throw new Error(message);
    }
  }
};

export const refreshAccessToken = async (token) => {
  const response = await axiosInstance.post("refresh", token);
  return response.data;
};

export const getRestaurants = async () => {
  try {
    const response = await apiInstance.get("/restaurants");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRestaurantsMaxPrice = async () => {
  try {
    const response = await apiInstance.get("/restaurants/maxprice");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRestaurantsByQuery = async (
  search = "",
  minPrice = "0",
  maxPrice = "",
  sortBy = "name",
  sortOrder = "asc",
) => {
  try {
    const response = await apiInstance.get(
      `/restaurants/search?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await apiInstance.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default apiInstance;
