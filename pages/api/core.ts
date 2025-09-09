import { JsonWebTokenError, sign } from 'jsonwebtoken';
import { Context, Middleware, ParameterizedContext } from 'koa';
import JWT from 'koa-jwt';
import { HTTPError } from 'koajax';
import { cache, KoaOption, withKoa } from 'next-ssr-middleware';
import { Month } from 'web-utility';

import { CrawlerEmail, JWT_SECRET, VERCEL_URL } from '../../models/configuration';

export type JWTContext = ParameterizedContext<
  { jwtOriginalError: JsonWebTokenError } | { user: { email: string } }
>;

export const parseJWT = JWT({
  secret: JWT_SECRET!,
  cookie: 'token',
  passthrough: true,
});

export const verifyJWT = JWT({ secret: JWT_SECRET!, cookie: 'token' });

if (JWT_SECRET) console.info('🔑 [Crawler JWT]', sign({ email: CrawlerEmail }, JWT_SECRET));

export const safeAPI: Middleware<any, any> = async (context: Context, next) => {
  try {
    return await next();
  } catch (error) {
    if (!(error instanceof HTTPError)) {
      console.error(error);

      context.status = 400;

      return (context.body = { message: (error as Error).message });
    }
    const { message, response } = error;
    let { body } = response;

    context.status = response.status;
    context.statusMessage = message;

    if (body instanceof ArrayBuffer)
      try {
        body = new TextDecoder().decode(new Uint8Array(body));

        body = JSON.parse(body);
      } catch {
        //
      }
    console.error(JSON.stringify(body, null, 2));

    context.body = body;
  }
};

export const withSafeKoa = <S, C>(...middlewares: Middleware<S, C>[]) =>
  withKoa<S, C>({} as KoaOption, safeAPI, ...middlewares);

export function getTarget(link: URL | string): string {
  const { origin = `https://${VERCEL_URL}`, href = `https://${VERCEL_URL}` } =
    globalThis.location || {};

  return origin !== new URL(link, href).origin ? '_blank' : '_self';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const solidCache = cache<any, any>(Month, Month);
