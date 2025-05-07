export const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY,
  DefaultImage = process.env.NEXT_PUBLIC_LOGO || '/og.png';

export const isServer = () => typeof window === 'undefined';

export const { VERCEL, VERCEL_URL, JWT_SECRET, GITHUB_TOKEN, CACHE_REPOSITORY } = process.env;

export const API_Host = isServer()
  ? VERCEL_URL
    ? `https://${VERCEL_URL}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const CACHE_HOST = process.env.NEXT_PUBLIC_CACHE_HOST!,
  CrawlerEmail = `crawler@idea2.app`;

export const ProxyBaseURL = `https://idea2.app/proxy`;

export const LARK_API_HOST = `${API_Host}/api/Lark/`;

export const LarkAppMeta = {
  id: process.env.LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!,
};
export const LarkBaseId = process.env.NEXT_PUBLIC_LARK_BASE!;
