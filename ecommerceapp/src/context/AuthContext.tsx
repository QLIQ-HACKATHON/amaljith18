/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  password: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser: User = { email, password, role: "admin" };
      sessionStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      return true;
    }

    const storedUser = sessionStorage.getItem("registeredUser");
    if (storedUser) {
      const { email: storedEmail, password: storedPass } =
        JSON.parse(storedUser);
      if (email === storedEmail && password === storedPass) {
        const user: User = { email, password, role: "user" };
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };
  const isLoggedIn = !!user;
  return (
    <AuthContext.Provider value={{ user, login, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
