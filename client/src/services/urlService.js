import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const parseErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

export const createShortUrl = async (payload) => {
  try {
    const response = await apiClient.post("/urls", payload);
    return response.data;
  } catch (error) {
    throw new Error(parseErrorMessage(error), { cause: error });
  }
};

export const getRecentUrls = async (limit = 10) => {
  try {
    const response = await apiClient.get(`/urls/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(parseErrorMessage(error), { cause: error });
  }
};

export const getUrlDetails = async (shortCode) => {
  try {
    const response = await apiClient.get(`/urls/${shortCode}`);
    return response.data;
  } catch (error) {
    throw new Error(parseErrorMessage(error), { cause: error });
  }
};

export const deleteShortUrl = async (shortCode) => {
  try {
    const response = await apiClient.delete(`/urls/${shortCode}`);
    return response.data;
  } catch (error) {
    throw new Error(parseErrorMessage(error), { cause: error });
  }
};

export const getApiBaseUrl = () => API_BASE_URL;
