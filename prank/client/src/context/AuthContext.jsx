import { createContext, useContext, useState, useEffect } from "react";
import { getMeApi } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeApi()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        setUser(null);
        localStorage.removeItem("accessToken");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (userData, accessToken) => {
    setUser(userData);
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
