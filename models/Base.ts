import { HTTPClient } from 'koajax';

import { lark } from '../pages/api/Lark/core';

export const isServer = () => typeof window === 'undefined';

export const VercelHost = process.env.VERCEL_URL,
  GithubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  LarkBaseId = process.env.NEXT_PUBLIC_LARK_BASE!;

const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

const { BUILDING } = process.env;

export const larkClient = BUILDING
  ? lark.client
  : new HTTPClient({
      baseURI: `${API_Host}/api/Lark/`,
      responseType: 'json',
    });

export const githubClient = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json',
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`,
    };
  return next();
});
