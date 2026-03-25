import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/photo",
        search: "**",
      },
    ],
  },
};

export default nextConfig;
