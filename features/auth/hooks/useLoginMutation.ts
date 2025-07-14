import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { login } from "../services/login";
import { useAuth } from "./useAuth";

export const useLoginMutation = () => {
  const route = useRouter();
  const { handleAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      route.push("/home");
      await handleAuth(data.token, data.refresh_token, data.id);
      await SecureStore.getItemAsync("token");
      await SecureStore.getItemAsync("refresh_token");
      await SecureStore.getItemAsync("id");
    },
    onError: (error: any) => {
      Alert.alert("Erro", error.response?.message || "Erro no login.");
      console.error("Login error:", error?.response?.message || error.message);
    },
  });
};
