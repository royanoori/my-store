import axios from 'axios'
import { UserResponse } from "./types";

export const getServicerData = async (agencyCode: string) => {
  const { data } = await axios.get<UserResponse>(`/api/proxy/GetServicerData`, {
    params: { agencyCode },
  });
  return data;
};
