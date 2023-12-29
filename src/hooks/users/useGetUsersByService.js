import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const fetchUsersFn = async (axios, serviceId) => {
  const response = await axios.get(`${ENDPOINTS.USERS}/service/${serviceId}`);
  return response;
};

export const useGetUsersByService = (serviceId) => {
  const axiosInstance = useAxios();
  const { status, data } = useQuery({
    queryKey: ["fetchUsersService"],
    queryFn: () => fetchUsersFn(axiosInstance, serviceId),
    refetchOnWindowFocus: false,
  });

  return {
    status,
    users: data?.data ?? [],
  };
};
