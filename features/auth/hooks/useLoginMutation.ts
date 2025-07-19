import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { login } from "../services/login";
import { useAuth } from "./useAuth";

export const useLoginMutation = () => {
  const { handleAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      console.log("Login successful:", data);
      await handleAuth(data.token, data.refresh_token, data.id);
    },
    onError: (error: any) => {
      console.error("Login error FULL:", JSON.stringify(error));

      const message =
        error?.response?.data?.message || error?.message || "Erro no login.";

      Alert.alert("Erro", message);
    },
  });
};
