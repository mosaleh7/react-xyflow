import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for React Flow
  experimental: {
    optimizePackageImports: ['@xyflow/react', 'lucide-react'],
  },
  
  // Enable webpack optimizations for React Flow
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  
  // Optimize images for workflow platform
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features for better performance
  swcMinify: true,
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

