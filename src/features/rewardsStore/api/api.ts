import axios from "axios";

export interface ScoreResponse {
  IsSuccess: boolean;
  Message: string;
  Exception: string | null;
  Data: number;
}

export const getServicerCurrentScore = async (agencyCode: string) => {
  const { data } = await axios.get<ScoreResponse>(
    "https://api2.entekhabservice.ir/GetServicerCurrentScore",
    {
      headers: {
        "Accept": "application/json",
        "Caller-Id": "ANDROID-1699",
        "Password": "Mj7579*Bn1566!",
      },
      params: { agencyCode }, // query param
    }
  );
  return data;
};
