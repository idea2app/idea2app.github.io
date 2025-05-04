import { HTTPClient } from 'koajax';
import MIME from 'mime';
import { githubClient } from 'mobx-github';
import { TableCellValue, TableCellMedia, TableCellAttachment } from 'mobx-lark';

import { API_Host, GithubToken, isServer } from './configuration';

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});

export { githubClient };

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
