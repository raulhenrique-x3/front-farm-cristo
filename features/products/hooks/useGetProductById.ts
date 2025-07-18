import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/getProductById";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["getProductById", id],
    queryFn: () => getProductById(id),
    ...options,
  });
};
