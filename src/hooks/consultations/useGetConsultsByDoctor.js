import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";
import { useEffect } from "react";

const fetchConsultsFn = async (axios, idMedecin) => {
  const response = await axios.get(
    `${ENDPOINTS.CONSULTS}/medecin/${idMedecin}`
  );
  return response;
};

export const useGetConsultsByDoctor = (idMedecin) => {
  const axiosInstance = useAxios();
  const { status, data, refetch } = useQuery({
    queryKey: ["fetchConsultsByDoc"],
    queryFn: () => fetchConsultsFn(axiosInstance, idMedecin),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [idMedecin]);

  return {
    status,
    consultations: data?.data ?? [],
  };
};
