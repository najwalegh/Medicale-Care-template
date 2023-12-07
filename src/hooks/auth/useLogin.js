import axios from "axios";
import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";

const login = async (axios, form) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = await axios.post(ENDPOINTS.LOGIN, form, config);
  return response;
};

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const performLogin = async (formData) => {
    try {
      setLoading(true);
      const result = await login(axiosInstance, formData);
      setData(result?.data);
    } catch (error) {
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    error,
    loading,
    performLogin,
  };
};
