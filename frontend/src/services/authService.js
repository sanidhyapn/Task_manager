import axios from "axios";

const API_URL = "https://task-manager-backend-9hv8.onrender.com/api/auth";

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // If using cookies for authentication
  });
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    throw error;
  }
};