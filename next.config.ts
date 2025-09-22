import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tools.entekhabservice.ir",
        pathname: "/slider/**",
      },
    ],
  },
};

export default nextConfig;
