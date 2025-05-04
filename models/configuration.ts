export const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY,
  DefaultImage = process.env.NEXT_PUBLIC_LOGO || '/og.png';

export const isServer = () => typeof window === 'undefined';

export const { VERCEL } = process.env,
  VercelHost = process.env.VERCEL_URL;

export const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const CACHE_HOST = process.env.NEXT_PUBLIC_CACHE_HOST!;

export const { CRAWLER_TOKEN, JWT_SECRET } = process.env;

export const ProxyBaseURL = `https://idea2.app/proxy`;

export const GithubToken = process.env.GITHUB_TOKEN;

export const LARK_API_HOST = `${API_Host}/api/Lark/`;

export const LarkAppMeta = {
  id: process.env.LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!,
};
export const LarkBaseId = process.env.NEXT_PUBLIC_LARK_BASE!;
