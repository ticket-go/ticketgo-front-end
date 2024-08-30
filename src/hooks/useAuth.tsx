"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { logoutAuth } from "@/actions/auth-logout";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Auth } from "@/types/auth";

interface AuthContextType {
  user: Auth["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: Auth["user"] | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Auth["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = getCookie("access_token");
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getCookie("access_token");
      const user = JSON.parse(getCookie("user") || "{}");

      if (token) {
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token]);

  const handleLogout = async () => {
    await logoutAuth();
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("user");
    setIsAuthenticated(false);
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        logout: handleLogout,
      }}
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
