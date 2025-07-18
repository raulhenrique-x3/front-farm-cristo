import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../services/getProductByCategory";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetProductsByCategory = (category: string | null) => {
  return useQuery({
    queryKey: ["getProductsByCategory", category],
    queryFn: () => getProductByCategory(category as string),
    ...options,
  });
};
