import { useQuery } from "@tanstack/react-query";
import { getServicerCurrentScore, ScoreResponse } from "./api";

export const useServicerScore = (agencyCode: string) => {
  return useQuery({
    queryKey: ["servicerScore", agencyCode],
    queryFn: () => getServicerCurrentScore(agencyCode),
    enabled: !!agencyCode,
    staleTime: 60_000,
    retry: 1,
  });
};
