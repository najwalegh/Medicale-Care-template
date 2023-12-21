import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

const medcin = async (axios) => {
  const idService="123"
  const response = await axios.get(`${ENDPOINTS.MEDCINLIST}${idService}`);
  return response;
};

export const useGetMedcin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  const performService = async () => {
    try {
      setLoading(true);
      const result = await medcin(axiosInstance);
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
    performService,
  };
};
