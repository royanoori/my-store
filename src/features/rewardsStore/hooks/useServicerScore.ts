import { useSnackbar } from "@/providers/SnackbarProvider";
import { useQuery } from "@tanstack/react-query";
import { getServicerCurrentScore } from "../api/api";

export const useServicerScore = (agencyCode: string) => {
  const { showMessage } = useSnackbar();

  return useQuery<any, Error>({
    queryKey: ["servicerScore", agencyCode],
    queryFn: () => getServicerCurrentScore(agencyCode),
    enabled: !!agencyCode,
    staleTime: 60_000,
    retry: 1,
    meta: {
      onError: (error :any) => {
        showMessage(error, "error");
      },
    },
  });
};
