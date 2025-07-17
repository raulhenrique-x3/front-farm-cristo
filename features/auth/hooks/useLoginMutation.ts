import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { login } from "../services/login";
import { useAuth } from "./useAuth";

export const useLoginMutation = () => {
  const { handleAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await handleAuth(data.token, data.refresh_token, data.id);
    },
    onError: (error: any) => {
      Alert.alert("Erro", error.response?.message || "Erro no login.");
      console.error("Login error:", error?.response?.message || error.message);
    },
  });
};
