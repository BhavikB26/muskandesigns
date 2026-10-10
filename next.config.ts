import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the same Wi-Fi load the dev server (http://<laptop IP>:3000).
  allowedDevOrigins: ["192.168.1.3"],
};

export default nextConfig;
