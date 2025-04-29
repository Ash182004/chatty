import axios from "axios";

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5550/api" 
    : "/api", // Use the appropriate base URL based on the environment
  withCredentials: true, // Send cookies and other credentials with requests
});

// Interceptors to handle requests and responses

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add headers here or log requests if needed
    // Example: config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    console.error("Response Error: ", error.response || error.message);
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle session expiration
      console.error("Session expired, please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
