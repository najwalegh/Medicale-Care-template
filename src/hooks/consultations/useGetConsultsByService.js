import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const fetchConsultsFn = async (axios, idService) => {
  const response = await axios.get(
    `${ENDPOINTS.CONSULTS}/service/${idService}`
  );
  return response;
};

export const useGetConsultsByService = (idService) => {
  const axiosInstance = useAxios();
  const { status, data } = useQuery({
    queryKey: ["fetchConsultsService"],
    queryFn: () => fetchConsultsFn(axiosInstance, idService),
    refetchOnWindowFocus: false,
  });

  return {
    status,
    consultations: data?.data ?? [],
  };
};
