import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // Load token from localStorage on initial render
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);

    // Check URL for Google OAuth token
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");

    if (googleToken) {
      setToken(googleToken);
      localStorage.setItem("token", googleToken);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
      navigate("/portal"); // Redirect after login
    }
  }, [navigate]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    navigate("/portal"); // Redirect after login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/"); // Redirect to homepage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
