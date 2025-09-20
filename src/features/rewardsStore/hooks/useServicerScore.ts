import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { getServicerCurrentScore } from "../api/api";
import { ScoreResponse } from "../type";

export const useServicerScore = (agencyCode: string) => {
  const { showMessage } = useSnackbar();

  const options: UseQueryOptions<ScoreResponse, Error> = {
    queryKey: ["servicerScore", agencyCode],
    queryFn: () => getServicerCurrentScore(agencyCode),
    enabled: !!agencyCode,
    staleTime: 60_000,
    retry: 1,
  };

  return useQuery(options);
};
