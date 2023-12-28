import axios from "axios";
import { ENDPOINTS } from "../EndPoints";
import { useMutation } from "@tanstack/react-query";

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
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const loginUserMutation = useMutation({
    mutationFn: (formData) => login(axiosInstance, formData),
  });

  return {
    loginUserMutation,
  };
};
