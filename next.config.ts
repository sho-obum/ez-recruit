import type { NextConfig } from "next";

// Static export: plain HTML in out/, served from S3 + CloudFront with no server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
