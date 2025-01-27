import { withSentryConfig } from '@sentry/nextjs';
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
