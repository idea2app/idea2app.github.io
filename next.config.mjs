import { withSentryConfig } from '@sentry/nextjs';
import setPWA from 'next-pwa';
// @ts-ignore
import withLess from 'next-with-less';
import webpack from 'webpack';

const { NODE_ENV, CI, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } =
  process.env;
const isDev = NODE_ENV === 'development';

const withPWA = setPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

const nextConfig = withLess(
  withPWA({
    output: CI ? 'standalone' : undefined,
    webpack: config => {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
          resource.request = resource.request.replace(/^node:/, '');
        }),
      );
      return config;
    },
  }),
);

export default isDev || !SENTRY_AUTH_TOKEN
  ? nextConfig
  : withSentryConfig(nextConfig, {
      autoInstrumentServerFunctions: false,
      org: SENTRY_ORG,
      project: SENTRY_PROJECT,
      authToken: SENTRY_AUTH_TOKEN,
      silent: true,
    });
