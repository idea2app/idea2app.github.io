import { githubClient } from 'mobx-github';

import { safeAPI } from '../core';

export const proxyGithub = <T>(dataFilter?: (path: string, data: T) => T) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    delete headers.host;

    const path = url!.slice(`/api/GitHub/`.length);

    const { status, body: data } = await githubClient.request<T>({
      // @ts-expect-error KoAJAX type compatibility
      method,
      path,
      // @ts-expect-error KoAJAX type compatibility
      headers,
      body: body || undefined,
    });

    response.status(status);
    response.send(dataFilter?.(path, data as T) || data);
  });
