import { queryOptions, useQuery } from "@tanstack/react-query";
import { getUser } from "../hooks/useGetUser";

function getUserOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export const useGetUser = () => {
  return useQuery(getUserOptions());
};
