// utils/axiosInstance.js
import axios from "axios";
import { toast } from "react-hot-toast";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // optional: keep dynamic
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fix #1: Avoid async inside request interceptor directly
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();

      if (session?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${session.accessToken}`,
        };
      }
      return config;
    } catch (error) {
      console.error("❌ Failed to attach token to request:", error);
      return config; // don't block request if session fails
    }
  },
  (error) => Promise.reject(error)
);

// Fix #2: Harden response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unexpected error occurred.";

    if (status === 401) {
      toast.error("Unauthorized. Please sign in again.");
    } else if (status === 403) {
      toast.warn("You do not have permission to do this.");
    } else if (status >= 500) {
      toast.error("Server error occurred. Try again later.");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
