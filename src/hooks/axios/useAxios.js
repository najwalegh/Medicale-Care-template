import axios from "axios";
import { useTokenContext } from "../../context/AuthContextProvider";

export const useAxios = () => {
  const { token } = useTokenContext();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
    return config;
  });
  return axiosInstance;
};
