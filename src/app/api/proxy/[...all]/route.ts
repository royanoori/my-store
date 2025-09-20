// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { all } = req.query;
//   const path = Array.isArray(all) ? all.join("/") : all;

//   try {
//     const response = await axios({
//       method: req.method,
//       url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`, // اینجا از env استفاده شد
//       params: req.query,
//       data: req.body,
//       headers: {
//         "Caller-Id": process.env.NEXT_PUBLIC_API_CALLER_ID!,
//         "Password": process.env.NEXT_PUBLIC_API_PASSWORD!,
//         Accept: "application/json",
//       },
//     });

//     res.status(response.status).json(response.data);
//   } catch (error: any) {
//     res.status(error.response?.status || 500).json({ message: error.message });
//   }
// }

// app/api/proxy/[...all]/route.ts
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
    const path = url.pathname.split("/api/proxy/")[1]; // مسیر بعد از /api/proxy/
    
    // ساخت query params
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // اگر POST است، body را دریافت کن
    const data = method === "POST" ? await req.json() : undefined;

    // درخواست به سرور اصلی
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
    return NextResponse.json(
      { message: error.response?.data || error.message || "خطای ناشناخته" },
      { status: error.response?.status || 500 }
    );
  }
}
