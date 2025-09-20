// import { axiosInstance } from "@/lib/axiosInstance";
// import { ScoreResponse } from "../type";

// export const getServicerCurrentScore = async (agencyCode: string) => {
//   console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

//   const { data } = await axiosInstance.get<ScoreResponse>(
//     "/GetServicerCurrentScore",
//     {
//       params: { agencyCode },
//     }
//   );
//   return data;
// };


import axios from "axios";

export const getServicerCurrentScore = async (agencyCode: string) => {
  const { data } = await axios.get(`/api/proxy/GetServicerCurrentScore`, {
    params: { agencyCode },
  });
  return data;
};
