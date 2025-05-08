/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features and ensure proper route handling
  experimental: {
    // Add any needed experimental features
    serverComponentsExternalPackages: [],
    // Workaround for client reference manifest issues
    optimizePackageImports: ['@kinde-oss/kinde-auth-nextjs'],
  },
  // Ensure proper handling of route groups with parentheses
  reactStrictMode: true,
  // Use default output for Vercel deployment
  // output: 'export',
  // Add custom webpack configuration to handle route groups
  webpack(config) {
    return config;
  },
  // Downgrade React/Next.js version conflicts
  transpilePackages: ['@kinde-oss/kinde-auth-nextjs']
};

module.exports = nextConfig;
