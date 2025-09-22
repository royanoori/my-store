
import { useApiQuery } from "@/lib/useApiQuery";
import { ApiResponse } from "@/shared/types/api";
import { getSlides } from "../api/api";
import { SliderItem } from "../type";

export const useGetSlides = (
  options?: { enabled?: boolean }
) => {
  return useApiQuery<ApiResponse<SliderItem[]>>(
    ["GetSlides"],
    () => getSlides(),
    {
      ...options, // 👈 اینجا اضافه کن
    }
  );
};
