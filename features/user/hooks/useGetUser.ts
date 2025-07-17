import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/getUser";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetUser = (id: string | null) => {
  return useQuery({
    queryKey: ["getUser", id],
    queryFn: () => getUser(id as string),
    ...options,
  });
};
