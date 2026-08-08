import { createContext, useContext, useState, useEffect } from "react";
import { getMeApi } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true while checking cookie

  // On every page load — try to restore session from cookie
  useEffect(() => {
    getMeApi()
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))   // cookie missing or expired — stay logged out
      .finally(() => setLoading(false));
  }, []);

  const login  = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // Don't render anything until we know if user is logged in
  // This prevents a flash redirect to /login on refresh
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
