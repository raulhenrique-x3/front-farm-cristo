import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/getAllUsers";

const options = {
  staleTime: 1000 * 60 * 5, // 5 minutes
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    ...options,
  });
};
