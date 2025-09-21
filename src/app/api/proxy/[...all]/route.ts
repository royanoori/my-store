import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  return proxyHandler(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyHandler(req, "POST");
}

async function proxyHandler(req: NextRequest, method: "GET" | "POST") {
  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/api/proxy/")[1];

    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const data = method === "POST" ? await req.json() : undefined;

    const response = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`,
      headers: {
        "Caller-Id": process.env.NEXT_PUBLIC_API_CALLER_ID!,
        "Password": process.env.NEXT_PUBLIC_API_PASSWORD!,
        Accept: "application/json",
      },
      params,
      data,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const data = error.response?.data;
    const message =
      data?.Message && data.Message.trim() !== ""
        ? data.Message
        : error.message || "خطای ناشناخته";

    return NextResponse.json(
      { ...data, message }, // پیام آماده برای نمایش
      { status: error.response?.status || 500 }
    );
  }
}
