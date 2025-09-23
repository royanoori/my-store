import { useMutation } from "@tanstack/react-query";
import { SubmitOrderPayload } from "../type";
import { submitOrder } from "../api/api";
import { ApiResponse } from "@/shared/types/api";

export const useSubmitOrder = () => {
  return useMutation({
    mutationFn: submitOrder,
  });
};
