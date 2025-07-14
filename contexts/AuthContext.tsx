import * as SecureStore from "expo-secure-store";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  handleAuth: (
    token: string,
    refreshToken: string,
    id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadStorageData = useCallback(async () => {
    const token = await SecureStore.getItemAsync("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, []);

  const handleAuth = async (
    token: string,
    refreshToken: string,
    id: string
  ) => {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("refresh_token", refreshToken);
    await SecureStore.setItemAsync("id", id);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleAuth, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
