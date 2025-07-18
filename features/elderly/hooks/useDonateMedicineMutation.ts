import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { donateMedicine } from "../services/donateMedicine";

interface IEditProductParams {
  elderlyId: string;
  medicineId: string;
  quantity: number;
}

export const useDonateMedicineMutation = () => {
  return useMutation({
    mutationFn: ({ elderlyId, medicineId, quantity }: IEditProductParams) =>
      donateMedicine(elderlyId, medicineId, quantity),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts", "getProductsByCategory"],
      });
      Alert.alert("Sucesso", "Produto doado com sucesso!");
    },
    onError: (error: any) => {
      console.error("Doação error:", error?.response?.message || error.message);
    },
  });
};
