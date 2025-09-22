
import { axiosInstance } from "@/lib/axiosInstance";
import { ApiResponse } from "@/shared/types/api";
import { SliderItem, TGetScoreList, TGetServicerCurrentScore } from "../type";

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

export const getScoreList = (agencyCode: string, page: number) => {
  return axiosInstance
    .get<ApiResponse<TGetScoreList>>("/GetScoreList", {
      params: { agencyCode, page },
    })
    .then((res) => {
      if (!res.data.IsSuccess) {
        throw new Error(res.data.Message || "خطای ناشناخته");
      }
      return res.data.Data; // فقط Data برگرده
    });
};

