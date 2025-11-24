import type { NextConfig } from "next";

const requestedBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
const normalizedBasePath =
  requestedBasePath && requestedBasePath !== "/"
    ? requestedBasePath.startsWith("/")
      ? requestedBasePath
      : `/${requestedBasePath}`
    : "";

const basePath = normalizedBasePath || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
