import { HTTPClient } from 'koajax';

export const isServer = () => typeof window === 'undefined';

export const VercelHost = process.env.VERCEL_URL,
  GithubToken = process.env.GITHUB_TOKEN,
  LarkBaseId = process.env.NEXT_PUBLIC_LARK_BASE!;

const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const larkClient = new HTTPClient({
  baseURI: `${API_Host}/api/Lark/`,
  responseType: 'json',
});

export const githubClient = new HTTPClient({
  baseURI: isServer() ? 'https://api.github.com/' : `${API_Host}/api/GitHub/`,
  responseType: 'json',
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`,
    };
  return next();
});
