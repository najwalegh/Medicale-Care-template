import axios from "axios";

export const useAxios = () => {
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  console.log("token, ", userToken);

  const axiosInstance = axios.create({
    baseURL:
      process.env.REACT_APP_VITE_API_BASE_URL ?? "http://localhost:8081/api",
  });
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${userToken.accessToken}`;
    return config;
  });
  return axiosInstance;
};
