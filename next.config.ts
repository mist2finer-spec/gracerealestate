import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker / Vercel / Node deployments
  output: "standalone",

  // Production best-practice: enforce strict TypeScript
  // (set to true only if you have unresolved type errors during migration)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Production: keep React strict mode ON to catch issues early
  reactStrictMode: true,

  // Allow image domains used by the demo (ZAI CDN for property photos).
  // Replace or extend with your own CDN domain when you upload real photos.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
      },
      // Add your own CDN / S3 bucket here:
      // { protocol: "https", hostname: "your-cdn.example.com" },
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Allow cross-origin requests from the preview domain (sandbox only).
  // Remove `allowedDevOrigins` in production.
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? ["*.space-z.ai", "*.chatglm.cn"]
      : undefined,
};

export default nextConfig;
