import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

const medcin = async (axios,serviceId) => {
  console.log("www ",ENDPOINTS.MEDCINLIST,`/${serviceId}/service`);

  const response = await axios.get(`${ENDPOINTS.MEDCINLIST}/${idService}/service`);
  console.log("sending ");
  return response;
};

export const useGetMedcin = () => {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  const performService = async (serviceId) => {
    try {
      setLoading(true);
      const result = await medcin(axiosInstance,serviceId);
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
