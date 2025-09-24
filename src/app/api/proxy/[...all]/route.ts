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
  } 
catch (error: unknown) {
  let message = "خطای ناشناخته";
  let data: Record<string, unknown> | undefined = undefined;

  if (axios.isAxiosError(error) && error.response) {
    data = error.response.data as Record<string, unknown>;
    message = (data?.Message as string)?.trim() !== "" ? (data.Message as string) : error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json(
    { ...data, message },
    { status: (axios.isAxiosError(error) ? error.response?.status : 500) || 500 }
  );
}
}
