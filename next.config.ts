import { withSentryConfig } from '@sentry/nextjs';
import { NextConfig } from 'next';
import setPWA from 'next-pwa';
import webpack from 'webpack';

const { NODE_ENV, CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;
const isDev = NODE_ENV === 'development';

const withPWA = setPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

const rewrites: NextConfig['rewrites'] = async () => ({
  beforeFiles: [
    {
      source: '/proxy/github.com/:path*',
      destination: 'https://github.com/:path*',
    },
    {
      source: '/proxy/raw.githubusercontent.com/:path*',
      destination: 'https://raw.githubusercontent.com/:path*',
    },
  ],
  afterFiles: [],
});

const nextConfig = withPWA({
  output: CI ? 'standalone' : undefined,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'github.com' }],
  },
  webpack: config => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  rewrites: rewrites as any,
});

export default isDev || !SENTRY_AUTH_TOKEN
  ? nextConfig
  : withSentryConfig(nextConfig, {
      autoInstrumentServerFunctions: false,
      org: SENTRY_ORG,
      project: SENTRY_PROJECT,
      authToken: SENTRY_AUTH_TOKEN,
      silent: true,
    });
