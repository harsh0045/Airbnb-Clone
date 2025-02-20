import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images:{
    domains:[
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com"
    ]
  }
};

export default nextConfig;
