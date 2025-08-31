import { HTTPClient } from 'koajax';
import MIME from 'mime';
import { githubClient } from 'mobx-github';
import { TableCellValue, TableCellMedia, TableCellAttachment } from 'mobx-lark';
import { Filter, ListModel, toggle, IDType, DataObject } from 'mobx-restful';
import type { PageData } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { API_Host, GITHUB_TOKEN, isServer } from './configuration';

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GITHUB_TOKEN)
    request.headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
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

export abstract class TableModel<D extends DataObject, F extends Filter<D> = Filter<D>> extends ListModel<
  D,
  F
> {
  @toggle('uploading')
  async updateOne(data: Filter<D>, id?: IDType) {
    const { body } = await (id
      ? this.client.put<D>(`${this.baseURI}/${id}`, data)
      : this.client.post<D>(this.baseURI, data));

    return (this.currentOne = body!);
  }

  async loadPage(pageIndex: number, pageSize: number, filter: F) {
    const { body } = await this.client.get<{ list: D[], count: number }>(
      `${this.baseURI}?${buildURLData({ ...filter, pageIndex, pageSize })}`,
    );

    return { pageData: body!.list, totalCount: body!.count };
  }
}
