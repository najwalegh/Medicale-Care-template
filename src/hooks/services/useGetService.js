import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

const service = async (axios) => {
  const response = await axios.get(ENDPOINTS.SERVICE);
  return response;
};

export const useGetService = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { axiosInstance } = useAxios();

  const performService = async () => {
    try {
      setLoading(true);
      const result = await service(axiosInstance);
      setData(result?.data);
    } catch (error) {
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Call the service when the hook is first executed
  performService();
  return {
    data,
    error,
    loading,
  };
};