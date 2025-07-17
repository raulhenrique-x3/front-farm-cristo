import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { createUser } from "../services/createUser";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      console.log("Usuário cadastrado", data);
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
