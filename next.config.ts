import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserves the old WordPress site's trailing-slash URLs
  // (e.g. /root-canal-treatment-noida/) so existing SEO/backlinks keep working.
  trailingSlash: true,
};

export default nextConfig;
