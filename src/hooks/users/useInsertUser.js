import { ENDPOINTS } from "../EndPoints";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const saveUser = async (axios, form) => {
  const response = await axios.post(ENDPOINTS.USERS, form);
  return response;
};

export const useInsertUser = () => {
  const axiosInstance = useAxios();
  const insertUserMutation = useMutation({
    mutationFn: (formData) => saveUser(axiosInstance, formData),
  });

  return {
    insertUserMutation,
  };
};
