import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ["res.cloudinary.com"], // Allow images from Cloudinary
  },
  experimental: {
    serverActions: true, // Enable server actions (for App Router)
  },
};

export default nextConfig;
