import { useQuery } from "@tanstack/react-query";
import { getPharmaceutical } from "../services/getUser";

const options = {
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 5,
};

export const useGetPharmaceutical = (id: string | null) => {
  return useQuery({
    queryKey: ["getPharmaceutical", id],
    queryFn: () => getPharmaceutical(id as string),
    ...options,
  });
};
