
import { useApiQuery } from "@/lib/useApiQuery";
import { getProductList } from "../api/api";
import { TProductList } from "../type";
import { ApiResponse } from "@/shared/types/api";

export const useGetProductList = (
  options?: { enabled?: boolean }
) => {
  return useApiQuery<ApiResponse<TProductList>>(
    ["ProductList"],
    () => getProductList(),
    {
      ...options, // 👈 اینجا اضافه کن
    }
  );
};
