import { ENDPOINTS } from "../EndPoints";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const insertUserMutation = useMutation({
    mutationFn: (formData) => register(axiosInstance, formData),
  });

  return {
    insertUserMutation,
  };
};
