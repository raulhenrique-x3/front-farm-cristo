import { queryClient } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/createUser";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      console.log("Usuário cadastrado", data);
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
    onError: (error: any) => {
      console.error(
        "Cadastro error:",
        error?.response?.message || error.message
      );
    },
  });
};
