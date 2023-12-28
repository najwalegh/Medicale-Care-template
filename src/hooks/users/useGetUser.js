import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";
import { useEffect } from "react";

const fetchUserFn = async (axios, id) => {
  const response = await axios.get(ENDPOINTS.USERS, {
    params: {
      id: id,
    },
  });
  return response;
};

export const useGetUser = (idUser) => {
  const axiosInstance = useAxios();
  const { status, data, refetch } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => fetchUserFn(axiosInstance, idUser),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [idUser]);

  return {
    status,
    user: data?.data ?? [],
  };
};
