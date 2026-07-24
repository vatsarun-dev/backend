/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { getApiError } from "../services/apiClient";
import { clearSession, readSession, saveSession } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession()?.user || null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const session = readSession();
    setUser(session?.user || null);
    setBooting(false);

    const onExpired = () => {
      setUser(null);
      toast.error("Session expired. Please sign in again.");
    };

    window.addEventListener("adhh:session-expired", onExpired);
    return () => window.removeEventListener("adhh:session-expired", onExpired);
  }, []);

  const login = useCallback(async (values, remember) => {
    const { data } = await authService.login(values);
    saveSession({ user: data.user }, remember);
    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(async (values, remember) => {
    const { data } = await authService.register(values);
    saveSession({ user: data.user }, remember);
    setUser(data.user);
    return data.user;
  }, []);

  const authenticate = useCallback((user, remember = true) => {
    saveSession({ user }, remember);
    setUser(user);
  }, []);

  const logout = useCallback((message) => {
    clearSession();
    setUser(null);
    if (message) toast(message);
  }, []);

  const forgotPassword = useCallback(async (values) => {
    try {
      const { data } = await authService.forgotPassword(values);
      return data;
    } catch (error) {
      throw new Error(getApiError(error));
    }
  }, []);

  const value = useMemo(
    () => ({ user, booting, isAuthenticated: Boolean(user), login, signup, authenticate, logout, forgotPassword }),
    [user, booting, login, signup, authenticate, logout, forgotPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
