import axios from "axios";
import { ErrorMessage } from "../utils/utils";

// Define base URL from environment variables
const baseBackendUrl = import.meta.env.VITE_BACKEND_URL;

// Define role-specific paths
const userPath = "";
const adminPath = "/admin";
const carOwnerPath = "/car-owner";
const chatPath = "/chat";
const messagePath ="/message"

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
      if (
        (error.response.status === 401 &&
          error.response.data.message === "Unauthorized") ||
        error.response.data.message ===
          "Access Denied: Your account has been temporarily blocked"
      ) {
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
const chatAxios = createRoleSpecificAxiosInstance("userToken", chatPath);
const messageAxios = createRoleSpecificAxiosInstance("userToken", messagePath);

export { userAxios, adminAxios, carOwnerAxios, chatAxios, messageAxios };
