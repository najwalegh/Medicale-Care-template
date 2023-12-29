import { ENDPOINTS } from "../EndPoints";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../axios/useAxios";

const fetchUsersFn = async (axios) => {
  const response = await axios.get(ENDPOINTS.USERS);
  return response;
};

export const useGetUsers = () => {
  const axiosInstance = useAxios();
  const { status, data } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () => fetchUsersFn(axiosInstance),
    refetchOnWindowFocus: false,
  });

  return {
    status,
    users: data?.data ?? [],
  };
};
