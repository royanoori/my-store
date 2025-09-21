import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useSnackbar } from "@/providers/SnackbarProvider";

export const useApiQuery = <T>(
  key: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
) => {
  const { showMessage } = useSnackbar();

  const result = useQuery<T, AxiosError>({
    queryKey: key,
    queryFn,
    staleTime: 60_000,
    retry: 0, // دوباره کال نشه
    ...options, // 👈 اینجا spread کن تا enabled و سایر گزینه‌ها اعمال بشه
  });

  // ⚡️ پیام خطای شبکه بعد از render
  useEffect(() => {
    if (result.error) {
      const error = result.error;
      const msg = (error.response?.data as any)?.Message || error.message || "خطای ناشناخته";
      showMessage(msg, "error");
    }
  }, [result.error, showMessage]);

  return result;
};
