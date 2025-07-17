import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/getAllProducts";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
    ...options,
  });
};
