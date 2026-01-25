
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
  // Lazy initializer: read token from localStorage synchronously
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    navigate("/portal"); // redirect after login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/"); // redirect to home page
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get("token");

    if (googleToken) {
      login(googleToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    setLoading(false); // done checking token
  }, []);

  if (loading) return <div>Loading...</div>; // prevent early API calls

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
