"use client";

import { login as apiLogin, register as apiRegister } from "@u/services/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(localStorage.getItem("user"));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const { token, user } = await apiLogin(username, password);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    setIsAuthenticated(true);
    setUser(user);
    router.push("/");
  };

  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    await apiRegister(email, username, password);
    router.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
