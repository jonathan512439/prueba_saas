import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? '/prueba_saas' : '',
  assetPrefix: isGitHubPages ? '/prueba_saas' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
