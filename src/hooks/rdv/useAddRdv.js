import { useState } from "react";
import { ENDPOINTS } from "../EndPoints";
import axios from "axios";

const addRdv = async (axios, form) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = await axios.post(ENDPOINTS.CONSULTATION, form, config);
  return response;
};

export const useAddRdv = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const performNewRdv = async (formData) => {
    try {
      setLoading(true);
      console.log("l'envoi")
      const result = await addRdv(axiosInstance, formData);
      console.log("new daat")
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
    performNewRdv,
  };
};
