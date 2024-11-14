import { createContext, useContext, useEffect, useState } from "react";
import apiInstance, { refreshAccessToken } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const loginUser = (data) => {
    setUser(data.userData);
    setAccessToken(data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  const logoutUser = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
  };

  // send refresh to get access token when app loads
  useEffect(() => {
    const refreshTokenOnLoad = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return;
      }

      try {
        const data = await refreshAccessToken({ token: refreshToken });
        const newAccessToken = data.accessToken;
        setAccessToken(newAccessToken);
        setUser(data.userData);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        logoutUser();
      }
    };

    refreshTokenOnLoad();
  }, []);
  
  useEffect(() => {
    // add access token to request headers
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // send request to refresh when access token expired
    const responseInterceptor = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem("refreshToken");

          try {
            const data = await refreshAccessToken({ token: refreshToken });
            const newAccessToken = data.accessToken;
            setAccessToken(newAccessToken);

            // retry original request with new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiInstance(originalRequest);
          } catch (err) {
            logoutUser();
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  const value = {
    user,
    loginUser,
    logoutUser,
    isLoggedIn: !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
