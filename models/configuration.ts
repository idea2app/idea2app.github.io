export const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY,
  DefaultImage = process.env.NEXT_PUBLIC_LOGO || '/idea2app.svg';

export const isServer = () => typeof window === 'undefined';

export const isDev = process.env.NODE_ENV === 'development';

export const {
  NODE_ENV,
  CI,
  VERCEL,
  VERCEL_ENV = NODE_ENV,
  VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL,
  JWT_SECRET,
  GITHUB_TOKEN,
} = process.env;

export const RemoteDomain =
  VERCEL_ENV === 'production' ? VERCEL_PROJECT_PRODUCTION_URL : VERCEL_URL;

export const CurrentHost = RemoteDomain ? `https://${RemoteDomain}` : 'http://localhost:3000';

export const Own_API_Host = isServer() ? CurrentHost : globalThis.location.origin;

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST!;

export const CACHE_HOST = process.env.NEXT_PUBLIC_CACHE_HOST!;

export const ProxyBaseURL = `https://idea2app.cn/proxy`;

export const LARK_API_HOST = `${Own_API_Host}/api/Lark/`;

export const LarkAppMeta = {
  id: process.env.LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!,
};
export const LarkBaseId = process.env.NEXT_PUBLIC_LARK_BASE!;
