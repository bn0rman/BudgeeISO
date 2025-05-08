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
  // Add output for proper deployment
  output: 'standalone',
  // Add custom webpack configuration to handle route groups
  webpack(config) {
    return config;
  },
  // Downgrade React/Next.js version conflicts
  transpilePackages: ['@kinde-oss/kinde-auth-nextjs'],
  // Add redirects for old routes to new non-parenthesized routes
  async redirects() {
    return [
      {
        source: '/features',
        destination: '/marketing/features',
        permanent: true,
      },
      {
        source: '/how-it-works',
        destination: '/marketing/how-it-works',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/marketing/pricing',
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
