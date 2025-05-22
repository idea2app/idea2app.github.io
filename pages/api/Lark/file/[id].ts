import { fileTypeFromStream } from 'file-type';
import { createKoaRouter } from 'next-ssr-middleware';
import { parse } from 'path';

import { CACHE_HOST } from '../../../../models/configuration';
import { withSafeKoaRouter } from '../../core';
import { lark } from '../core';

const router = createKoaRouter(import.meta.url);

router.all('/:id', async context => {
  const { method, url, params } = context;
  const { id } = params,
    { ext } = parse(url!);

  if (ext)
    return context.redirect(
      new URL(new URL(url!, `http://${context.get('Host')}`).pathname, CACHE_HOST) + '',
    );
  const token = await lark.getAccessToken();

  const response = await fetch(lark.client.baseURI + `drive/v1/medias/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { ok, status, headers, body } = response;

  if (!ok) {
    context.status = status;

    return (context.body = await response.json());
  }
  const mime = headers.get('Content-Type'),
    [stream1, stream2] = body!.tee();

  const contentType = mime?.startsWith('application/octet-stream')
    ? (await fileTypeFromStream(stream1))?.mime
    : mime;
  context.set('Content-Type', contentType || 'application/octet-stream');
  context.set('Content-Disposition', headers.get('Content-Disposition') || '');
  context.set('Content-Length', headers.get('Content-Length') || '');

  if (method === 'GET')
    // @ts-expect-error Web type compatibility
    context.body = Readable.fromWeb(stream2);
});

export default withSafeKoaRouter(router);
