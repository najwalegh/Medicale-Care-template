import axios from "axios";

export const useAxios = () => {
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);

  const axiosInstance = axios.create({
    baseURL:
      process.env.REACT_APP_API_BASE_URL,
  });
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${userToken.accessToken}`;
    return config;
  });
  return axiosInstance;
};
