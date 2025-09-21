
import { useApiQuery } from "@/lib/useApiQuery";
import { ApiResponse } from "@/shared/types/api";
import { TGetServicerCurrentScore } from "../type";
import { getServicerCurrentScore } from "../api/api";

export const useGetServicerCurrentScore = (agencyCode: string) => {
  return useApiQuery<ApiResponse<TGetServicerCurrentScore>>(
    ["GetServicerCurrentScore", agencyCode],
    () => getServicerCurrentScore(agencyCode)
  );
};

