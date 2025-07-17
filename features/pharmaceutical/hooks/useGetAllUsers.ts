import { useQuery } from "@tanstack/react-query";
import { getAllPharmaceuticals } from "../services/getAllUsers";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllPharmaceuticals"],
    queryFn: getAllPharmaceuticals,
    ...options,
  });
};
