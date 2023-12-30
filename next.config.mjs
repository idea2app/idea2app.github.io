import { withSentryConfig } from '@sentry/nextjs';
import setPWA from 'next-pwa';
import withLess from 'next-with-less';
import webpack from 'webpack';

const { NODE_ENV, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT } = process.env;
const isDev = NODE_ENV === 'development';

const withPWA = setPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA(
  withLess({
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
  : withSentryConfig(
      {
        ...nextConfig,
        sentry: {
          transpileClientSDK: true,
          autoInstrumentServerFunctions: false,
        },
      },
      {
        org: SENTRY_ORG,
        project: SENTRY_PROJECT,
        authToken: SENTRY_AUTH_TOKEN,
        silent: true,
      },
    );
