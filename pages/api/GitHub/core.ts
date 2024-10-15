/* eslint-disable @typescript-eslint/ban-ts-comment */
import { githubClient } from 'mobx-github';

import { safeAPI } from '../core';

export const proxyGithub = <T>(dataFilter?: (path: string, data: T) => T) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    delete headers.host;

    const path = url!.slice(`/api/GitHub/`.length);

    const { status, body: data } = await githubClient.request<T>({
      //@ts-ignore
      method,
      path,
      //@ts-ignore
      headers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: body || undefined
    });

    response.status(status);
    response.send(dataFilter?.(path, data as T) ?? data);
  });
