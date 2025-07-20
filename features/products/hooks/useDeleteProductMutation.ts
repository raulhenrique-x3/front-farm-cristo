import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../services/deleteProduct";

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
    onError: (error: any) => {
      console.error("Delete error:", error?.response?.message || error.message);
    },
  });
};
