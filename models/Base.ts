import { HTTPClient } from 'koajax';
import MIME from 'mime';
import { TableCellValue, TableCellMedia, TableCellAttachment } from 'mobx-lark';

import { API_Host } from './configuration';

export const larkClient = new HTTPClient({
  baseURI: `${API_Host}/api/Lark/`,
  responseType: 'json',
});

export function fileURLOf(field: TableCellValue, cache = false) {
  if (!(field instanceof Array) || !field[0]) return field + '';

  const file = field[0] as TableCellMedia | TableCellAttachment;

  let URI = `/api/Lark/file/${'file_token' in file ? file.file_token : file.attachmentToken}`;

  if (cache) URI += '.' + MIME.getExtension('type' in file ? file.type : file.mimeType);

  return URI;
}
