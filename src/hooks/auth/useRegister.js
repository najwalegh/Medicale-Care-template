import { useState } from "react";
import { ENDPOINTS } from "../EndPoints";
import axios from "axios";

const register = async (axios, form) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = await axios.post(ENDPOINTS.REGISTER, form, config);
  return response;
};

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const performRegister = async (formData) => {
    try {
      setLoading(true);
      const result = await register(axiosInstance, formData);
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
    performRegister,
  };
};
