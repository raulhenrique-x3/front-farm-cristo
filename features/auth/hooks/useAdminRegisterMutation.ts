import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { register } from "../services/adminRegister";

export const useAdminRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: async () => {
      Alert.alert("Sucesso", "Administrador cadastrado com sucesso!");
    },
    onError: (error: any) => {
      Alert.alert("Erro", error.response?.message || "Erro no cadastro.");
      console.error(
        "Cadastro error:",
        error?.response?.message || error.message
      );
    },
  });
};
