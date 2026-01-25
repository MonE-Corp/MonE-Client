/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean; // Add loading state for hydration
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    navigate("/portal");
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  // Hydrate token from localStorage or URL query (Google OAuth)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");

    const storedToken = localStorage.getItem("token");

    if (googleToken) {
      login(googleToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>; // Prevent rendering until hydrated

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
