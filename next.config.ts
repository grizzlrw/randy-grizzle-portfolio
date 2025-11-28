import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      '*.scss': {
        loaders: ['sass-loader'],
      },
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'nlkailuifdzerlfdcrop.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);