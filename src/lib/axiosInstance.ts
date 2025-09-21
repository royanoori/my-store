// lib/axiosInstance.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/proxy", // ← تمام درخواست‌ها از پروکسی عبور می‌کنند
  headers: {
    Accept: "application/json",
  },
});
