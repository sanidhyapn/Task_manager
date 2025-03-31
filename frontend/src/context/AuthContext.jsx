import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user authentication on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("https://task-manager-backend-9hv8.onrender.com/api/auth/login", {
        email,
        password,
      });
      const loggedInUser = res.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Throw error so LoginPage can catch it
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user info from local storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
