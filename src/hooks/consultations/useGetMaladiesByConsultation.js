import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";
import { useEffect } from "react";

const fetchMaladiesFn = async (axios, consultationId) => {
  const response = await axios.get(`${ENDPOINTS.CONSULTS}/${consultationId}/maladies`);
  return response.data; 
};

export const useGetMaladiesByConsultation = (id) => {
  const axiosInstance = useAxios();
  
  const { status, data, refetch } = useQuery({
    queryKey: ["fetchMaladiesByConsultation"],
    queryFn: () => fetchMaladiesFn(axiosInstance, id),
    enabled: !!id, // Pour s'assurer que la requête n'est effectuée que si consultationId est défini
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return {
    status,
    maladies: data?.maladies ?? [],
    gender: data?.gender ?? null, // Ajoutez cette ligne pour récupérer le genre
  };
};
