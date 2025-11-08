import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**', // This allows all domains (use with caution in production)
      },
    ],
    // Optional: Configure image quality and formats
    formats: ['image/avif', 'image/webp'],
    // Optional: Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optional: Configure image sizes for layout shifts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add other Next.js config options here
};

export default nextConfig;
