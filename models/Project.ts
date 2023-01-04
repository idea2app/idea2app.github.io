import { TableCellValue, TableRecordList } from 'lark-ts-sdk';
import { ListModel, NewData, Stream } from 'mobx-restful';
import { buildURLData, isEmpty } from 'web-utility';

import { makeFilter } from '../pages/api/Lark/core';
import { ownClient } from './Base';

export type Project = Record<
  | 'id'
  | 'name'
  | 'type'
  | 'workForm'
  | 'price'
  | 'startDate'
  | 'settlementDate',
  TableCellValue
>;

const AppId = process.env.NEXT_PUBLIC_PROJECT_APP,
  TableId = process.env.NEXT_PUBLIC_PROJECT_TABLE;

export class ProjectModel extends Stream<Project>(ListModel) {
  client = ownClient;
  baseURI = `Lark/bitable/v1/apps/${AppId}/tables/${TableId}/records`;

  async *openStream(filter: NewData<Project>) {
    var lastPage = '';

    do {
      const { body } = await this.client.get<TableRecordList<Project>>(
        `${this.baseURI}?${buildURLData({
          page_size: 100,
          page_token: lastPage,
          filter: isEmpty(filter)
            ? 'NOT(CurrentValue.[settlementDate]="")'
            : makeFilter(filter),
          sort: JSON.stringify(['settlementDate DESC']),
        })}`,
      );
      var { items, total, has_more, page_token } = body!.data;

      lastPage = page_token;
      this.totalCount = total;

      yield* items.map(({ id, fields }) => ({ ...fields, id: id! }));
    } while (has_more);
  }
}

export default new ProjectModel();
