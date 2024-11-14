import { createContext, useContext, useEffect, useState } from "react";
import { refreshAccessToken } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const refreshTokenOnLoad = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return;
      }

      try {
        const data = await refreshAccessToken({ token: refreshToken });
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        setUser(data.userData);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        logoutUser();
      }
    };

    refreshTokenOnLoad();
  }, []);

  const loginUser = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    isLoggedIn: !!localStorage.getItem("accessToken"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
