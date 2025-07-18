import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { editProduct } from "../services/editProduct";
import { IProduct } from "../types/product";

interface IEditProductParams {
  id: string;
  payload: IProduct;
}

export const useEditProductMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: IEditProductParams) =>
      editProduct(id, payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      Alert.alert("Sucesso", "Produto editado com sucesso!");
    },
    onError: (error: any) => {
      console.error("Edição error:", error?.response?.message || error.message);
    },
  });
};
