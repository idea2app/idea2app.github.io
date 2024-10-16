/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LarkApp, LarkData } from 'mobx-lark';

import { safeAPI } from '../core';

export const lark = new LarkApp({
  id: process.env.LARK_APP_ID!,
  secret: process.env.LARK_APP_SECRET!
});

export const proxyLark = <T extends LarkData>(dataFilter?: (path: string, data: T) => T) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    await lark.getAccessToken();

    delete headers.host;

    const path = url!.slice(`/api/Lark/`.length);

    const { status, body: data } = await lark.client.request<T>({
      // @ts-ignore
      method,
      path,
      // @ts-ignore
      headers,

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: body || undefined
    });

    response.status(status);

    response.send(dataFilter?.(path, data!) ?? data);
  });
