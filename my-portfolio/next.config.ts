// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔴 Enable static export so Next generates `out/`
  output: "export",

  images: {
    // 🔴 Required for `output: "export"` when using next/image
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
 