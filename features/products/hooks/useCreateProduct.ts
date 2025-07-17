import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../services/createProduct";

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },
    onError: (error: any) => {
      console.error(
        "Cadastro error:",
        error?.response?.message || error.message
      );
    },
  });
};
