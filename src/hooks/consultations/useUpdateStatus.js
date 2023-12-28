import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "../EndPoints";
import { useAxios } from "../axios/useAxios";

const updateConsultFct = async (axios, id, status) => {
  console.log("id: ", id, "stau ", status);
  const response = await axios.put(`${ENDPOINTS.CONSULTS}/${id}/status`, {
    status: status,
  });
  return response;
};

export const useUpdateStatus = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation({
    mutationFn: (params) =>
      updateConsultFct(axiosInstance, params.id, params.status),
    onSuccess: async () => {
      queryClient.invalidateQueries(["fetchConsultsByDoc"]);
    },
  });
  return {
    updateStatusMutation,
  };
};
