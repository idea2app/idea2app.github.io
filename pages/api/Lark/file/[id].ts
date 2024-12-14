import { fileTypeFromBuffer } from 'file-type';
import { TableCellMedia, TableCellValue } from 'mobx-lark';
import { parse } from 'path';

import { safeAPI } from '../../core';
import { lark } from '../core';

export const fileURLOf = (field: TableCellValue) =>
  field instanceof Array
    ? field[0]
      ? `/api/Lark/file/${(field[0] as TableCellMedia).file_token}`
      : field + ''
    : field + '';

export const CACHE_HOST = process.env.NEXT_PUBLIC_CACHE_HOST!;

export default safeAPI(async ({ method, url, query, headers }, res) => {
  const { ext } = parse(url!);

  if (ext)
    return res.redirect(
      new URL(new URL(url!, headers.host).pathname, CACHE_HOST) + '',
    );

  switch (method) {
    case 'HEAD':
    case 'GET': {
      const { id } = query;

      await lark.getAccessToken();

      const file = await lark.downloadFile(id as string);

      const { mime } = (await fileTypeFromBuffer(file)) || {};

      res.setHeader('Content-Type', mime as string);

      return method === 'GET' ? res.send(Buffer.from(file)) : res.end();
    }
  }
  res.status(405).end();
});
