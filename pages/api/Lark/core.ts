import { Context, Middleware } from 'koa';
import { LarkApp, LarkData } from 'mobx-lark';
import { buildURLData } from 'web-utility';

import { API_HOST, LARK_API_HOST, LarkAppMeta } from '../../../models/configuration';

export const lark = new LarkApp(LarkAppMeta);

export const proxyLark = async <T extends LarkData>({
  method,
  url,
  headers: { host, authorization, 'content-length': _, ...headers },
  request,
}: Context) => {
  await lark.getAccessToken();

  const path = url!.slice(`/api/Lark/`.length),
    body = Reflect.get(request, 'body');

  // @ts-expect-error Type compatibility issue
  return lark.client.request<T>({ method, path, headers, body });
};

export const proxyLarkAll: Middleware = async context => {
  const { status, body } = await proxyLark(context);

  context.status = status;
  context.body = body;
};

export function resolveLarkFileURL(URI: string, cache = false) {
  const { protocol, host, pathname } = new URL(URI, API_HOST);

  return protocol === 'lark:'
    ? LARK_API_HOST + host + (cache ? pathname : pathname.split('.').slice(0, -1).join('.'))
    : URI;
}

type AttachmentMeta = Record<`${'table' | 'field' | 'record'}Id`, string>;

export async function downloadLarkFile(
  id: string,
  { tableId, fieldId, recordId } = {} as AttachmentMeta,
) {
  const token = await lark.getAccessToken();

  const extra = tableId && {
    bitablePerm: { tableId, attachments: { [fieldId]: { [recordId]: [id] } } },
  };
  return fetch(lark.client.baseURI + `drive/v1/medias/${id}/download?${buildURLData({ extra })}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
