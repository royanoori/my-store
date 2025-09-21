// features/user/hooks.ts
import { useApiQuery } from "@/lib/useApiQuery";
import { ApiResponse } from "@/shared/types/api";
import { UserData } from "./types";
import { getServicerData } from "./api";
import { globalShowSnackbar } from "@/providers/SnackbarProvider";
export const useGetServicerData = (agencyCode: string) => {
  return useApiQuery<ApiResponse<UserData>>(
    ["servicerData", agencyCode],
    async () => {
      const res = await getServicerData(agencyCode);

      // اینجا پیام API را بعد از render نمایش می‌دهیم
      if (!res.IsSuccess) {
        globalShowSnackbar?.(res.Message, "error");
      }

      return res;
    }
  );
};