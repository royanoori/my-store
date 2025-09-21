import { QueryClient } from "@tanstack/react-query";
import { globalShowSnackbar } from "./SnackbarProvider";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

// هندل گلوبال خطا
queryClient.getQueryCache().subscribe((event: any) => {
  if ("error" in event) {
    const error = event.error;

    // اگر AxiosError بود و پاسخ API داشت، پیام API را بگیریم
    let errorMessage = "خطای ناشناخته";
    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.Message || error.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    if (globalShowSnackbar) {
      globalShowSnackbar(errorMessage, "error");
    }
  }
});
