import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useSnackbar } from "@/providers/SnackbarProvider";

export const useApiQuery = <T>(
  key: string[],
  queryFn: () => Promise<T>
) => {
  const { showMessage } = useSnackbar();

  const result = useQuery<T, AxiosError>({
    queryKey: key,
    queryFn,
    staleTime: 60_000,
    retry: 0, // ❌ مهم: دوباره کال نشه
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
