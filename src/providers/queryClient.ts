import { QueryClient } from "@tanstack/react-query";
import { globalShowSnackbar } from "./SnackbarProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

// Global error handler بدون خطای TypeScript
queryClient.getQueryCache().subscribe((event: any) => {
  if ("error" in event) {
    const error = event.error;
    console.error("خطا در query/mutation:", error);

    if (globalShowSnackbar) {
      globalShowSnackbar(
        error instanceof Error ? error.message : "خطای ناشناخته",
        "error"
      );
    }
  }
});
