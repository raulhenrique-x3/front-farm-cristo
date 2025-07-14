import axios from "axios";
import { Alert } from "react-native";

export function handleAxiosError(
  error: unknown,
  fallbackMessage = "Erro inesperado"
) {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string })?.message || error.message;
    Alert.alert("Erro", message);
    console.error("Detalhes do erro:", error.response?.data || error);
  } else {
    Alert.alert("Erro", fallbackMessage);
    console.error("Erro desconhecido:", error);
  }
}
