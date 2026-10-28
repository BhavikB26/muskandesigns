import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the same Wi-Fi load the dev server (http://<laptop IP>:3000).
  allowedDevOrigins: ["192.168.1.3"],
  // 95 is used for the case study covers' device screens (text stays crisp).
  images: { qualities: [75, 95] },
};

export default nextConfig;
