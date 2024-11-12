import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const apiInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

// add access token to request headers
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// send request to refresh when access token expired
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url !== "/login" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const data = await refreshAccessToken({ token: refreshToken });
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // resend original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export const getRestaurants = async () => {
  try {
    const response = await apiInstance.get("/restaurants");
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

export const signup = async (userData) => {
  try {
    const response = await apiInstance.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (userData) => {
  try {
    const response = await apiInstance.post("/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const refreshAccessToken = async (token) => {
  // this doesn't use apiInstance so as to not cause loop in response interceptor if fail
  const response = await axios.post(`${SERVER_BASE_URL}/refresh`, token);
  return response.data;
};

export default apiInstance;
