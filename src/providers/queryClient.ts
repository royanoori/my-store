import { QueryClient } from "@tanstack/react-query";
import { globalShowSnackbar } from "./SnackbarProvider";
import axios, { AxiosError } from "axios";

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
// queryClient.getQueryCache().subscribe((event: any) => {
//   if ("error" in event) {
//     const error = event.error;
//     console.error("خطا در query/mutation:", error);

//     if (globalShowSnackbar) {
//       globalShowSnackbar(
//         error instanceof Error ? error.message : "خطای ناشناخته",
//         "error"
//       );
//     }
//   }
// });
// queryClient.getQueryCache().subscribe((event) => {
//   if (event?.query?.state?.status === "error") {
//     const error = event.query.state.error;
//     if (globalShowSnackbar) {
//       globalShowSnackbar(
//         error instanceof Error ? error.message : "خطای ناشناخته",
//         "error"
//       );
//     }
//   }
// });



function extractApiError(error: unknown): string {
  let errorMessage = "خطای ناشناخته";

  if (axios.isAxiosError(error)) {
    // اگر سرور چیزی برگردونده باشه
    const apiResponse = error.response?.data as any;

    if (apiResponse?.Message) {
      errorMessage = apiResponse.Message; // پیام واقعی API
    } else if (error.response?.status) {
      errorMessage = `خطای سرور (${error.response.status})`;
    } else {
      errorMessage = error.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
}

queryClient.getQueryCache().subscribe((event) => {
  if (event?.query?.state?.status === "error") {
    const errorMessage = extractApiError(event.query.state.error);

    if (globalShowSnackbar) {
      globalShowSnackbar(errorMessage, "error");
    }
  }
});
