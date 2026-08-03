import React,{ createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setUser({ token: storedToken });
    }
  }, []);

  const register = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData
    );
    return res.data;
  };

  // ✅ LOGIN
  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    const receivedToken = res.data.token;

    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);

    setUser(res.data.user || { token: receivedToken });

    return res.data;
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!")
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};