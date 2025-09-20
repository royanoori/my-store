import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Caller-Id": process.env.NEXT_PUBLIC_API_CALLER_ID!,
    "Password": process.env.NEXT_PUBLIC_API_PASSWORD!,
  },
});
