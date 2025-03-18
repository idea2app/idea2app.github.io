import { HTTPError } from 'koajax';
import { NextApiRequest, NextApiResponse } from 'next';
import { cache } from 'next-ssr-middleware';
import { Month } from 'web-utility';

import { VercelHost } from '../../models/Base';

export type NextAPI = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function safeAPI(handler: NextAPI): NextAPI {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        console.error(error);

        res.status(400);

        return res.send({ message: (error as Error).message });
      }
      const { message, response } = error;
      let { body } = response;

      res.status(response.status);
      res.statusMessage = message;

      if (body instanceof ArrayBuffer)
        try {
          const data = new TextDecoder().decode(new Uint8Array(body));
          console.error(data);

          body = JSON.parse(data);
          console.error(body);
        } catch {
          //
        }
      res.send(body);
    }
  };
}

export function getTarget(link: URL | string): string {
  const { origin = `https://${VercelHost}`, href = `https://${VercelHost}` } =
    globalThis.location || {};

  return origin !== new URL(link, href).origin ? '_blank' : '_self';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const solidCache = cache<any, any>(Month, Month);
