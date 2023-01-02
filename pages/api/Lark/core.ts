import { Lark, LarkData } from 'lark-ts-sdk';
import { DataObject } from 'mobx-restful';
import { isEmpty } from 'web-utility';

import { safeAPI } from '../core';

/**
 * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/filter
 */
export function makeFilter(data: DataObject, relation: 'AND' | 'OR' = 'AND') {
  const list = Object.entries(data)
    .map(
      ([key, value]) =>
        !isEmpty(value) &&
        (value instanceof Array ? value : [value]).map(
          (item: string) => `CurrentValue.[${key}].contains("${item}")`,
        ),
    )
    .filter(Boolean)
    .flat() as string[];

  return list[1] ? `${relation}(${list})` : list[0];
}

export const lark = new Lark({
  appId: process.env.LARK_APP_ID!,
  appSecret: process.env.LARK_APP_SECRET!,
});

export const proxyLark = <T extends LarkData>(
  dataFilter?: (path: string, data: T) => T,
) =>
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
      body: body || undefined,
    });

    response.status(status);

    response.send(dataFilter?.(path, data!) || data);
  });
