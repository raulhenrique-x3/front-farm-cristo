import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/getUserById";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetUserById = (id: string | null) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => getUserById(id as string),
    ...options,
  });
};
