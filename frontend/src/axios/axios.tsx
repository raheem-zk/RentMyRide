import axios from "axios";
import { ErrorMessage } from "../utils/utils";

// Define base URL from environment variables
const baseBackendUrl = import.meta.env.VITE_BACKEND_URL;

// Define role-specific paths
const userPath = ""; 
const adminPath = "/admin"; 
const carOwnerPath = "/car-owner"; 
const createRoleSpecificAxiosInstance = (tokenName, rolePath) => {
  const instance = axios.create({
    baseURL: `${baseBackendUrl}${rolePath}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      ErrorMessage(error.response.data.message);
      if (error.response.status === 401 && error.response.message === "Unauthorized") {
        localStorage.removeItem(tokenName);
      } else if (error.response.status === 500) {
        console.error("Internal Server Error:", error.response.data);
      }
      return Promise.reject(error.response.data);
    }
  );

  return instance;
};

// Create separate instances for each role
const userAxios = createRoleSpecificAxiosInstance("userToken", userPath);
const adminAxios = createRoleSpecificAxiosInstance("adminToken", adminPath);
const carOwnerAxios = createRoleSpecificAxiosInstance("carOwnerToken", carOwnerPath);

export { userAxios, adminAxios, carOwnerAxios };
