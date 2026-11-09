import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // IP دستگاه یا شبکه‌ای که از آن به سرور وصل می‌شوید را اینجا اضافه کنید
  allowedDevOrigins: ["192.168.1.11"],

  async redirects() {
    return [
      {
        source: "/account/login",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;