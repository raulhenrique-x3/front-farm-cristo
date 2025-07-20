import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services/deleteUser";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError: (error: any) => {
      console.error("Delete error:", error?.response?.message || error.message);
    },
  });
};
