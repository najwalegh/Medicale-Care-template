import { useState } from "react";
import { ENDPOINTS } from "../EndPoints";
import axios from "axios";

const addDoc = async (axios, form) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = await axios.post(ENDPOINTS.DOC, form, config);
  return response;
};

export const useAddDoc = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const performNewDoc = async (formData) => {
    try { 
      setLoading(true);
      console.log("l'envoi")
      const result = await addDoc(axiosInstance, formData);
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
    performNewDoc,
  };
};
