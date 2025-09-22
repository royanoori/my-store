
import { axiosInstance } from "@/lib/axiosInstance";
import { ApiResponse } from "@/shared/types/api";
import { SliderItem, TGetServicerCurrentScore } from "../type";

export const getServicerCurrentScore = (agencyCode: string) => {
  return axiosInstance
    .get<ApiResponse<TGetServicerCurrentScore>>("/GetServicerCurrentScore", { params: { agencyCode } })
    .then((res) => {
      if (!res.data.IsSuccess) throw new Error(res.data.Message || "خطای ناشناخته");
      return res.data;
    });
};


export const getSlides = () => {
  return axiosInstance
    .get<ApiResponse<SliderItem[]>>("/GetSlides")
    .then((res) => {
      if (!res.data.IsSuccess) throw new Error(res.data.Message || "خطای ناشناخته");
      return res.data;
    });
};