import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tools.entekhabservice.ir",
        pathname: "/slider/**",
      },
      {
        protocol: "https",
        hostname: "api2.entekhabservice.ir",
        pathname: "/ServicerClubObjectStorage/**", // تمام مسیرهای تصاویر
      },
    ],
  },
};

export default nextConfig;
