import { useQuery } from "@tanstack/react-query";
import { getServicerData } from "./api";
import { UserResponse } from "./types";

export const useGetServicerData = (agencyCode: string) => {
  return useQuery<UserResponse>({
    queryKey: ["useGetServicerData", agencyCode],
    queryFn: () => getServicerData(agencyCode),
    enabled: !!agencyCode,
  });
};
