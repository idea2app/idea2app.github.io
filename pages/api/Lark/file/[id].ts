import { fileTypeFromStream } from 'file-type';
import { Middleware } from 'koa';
import MIME from 'mime';
import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';
import { parse } from 'path';
import { Readable } from 'stream';
import { parseJSON } from 'web-utility';

import { CACHE_HOST } from '../../../../models/configuration';
import { safeAPI } from '../../core';
import { downloadLarkFile } from '../core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

const downloader: Middleware = async context => {
  const { method, url, params } = context;
  const { id } = params,
    { ext } = parse(url!);

  if (ext) {
    const { pathname } = new URL(url!, `http://${context.headers.host}`);

    return context.redirect(new URL(pathname, CACHE_HOST) + '');
  }

  const response = await downloadLarkFile(id);

  const { ok, status, headers, body } = response;

  if (!ok) {
    context.status = status;

    return (context.body = parseJSON(await response.text()));
  }
  const mime = headers.get('Content-Type'),
    [stream1, stream2] = body!.tee();

  const contentType =
    !mime || mime.startsWith('application/octet-stream')
      ? MIME.getType(id + '') || (await fileTypeFromStream(stream1))?.mime
      : mime;
  context.set('Content-Type', contentType || 'application/octet-stream');
  context.set('Content-Disposition', headers.get('Content-Disposition') || '');
  context.set('Content-Length', headers.get('Content-Length') || '');

  // @ts-expect-error Web type compatibility
  if (method === 'GET') context.body = Readable.fromWeb(stream2);
};

router.head('/:id', safeAPI, downloader).get('/:id', safeAPI, downloader);

export default withKoaRouter(router);
