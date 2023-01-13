import { TableCellValue, TableRecordList } from 'lark-ts-sdk';
import { ListModel, NewData, Stream, toggle } from 'mobx-restful';
import { buildURLData, isEmpty } from 'web-utility';

import { makeFilter, TableRecordData } from '../pages/api/Lark/core';
import { ownClient } from './Base';

export type Member = Record<'id' | 'name' | 'type', TableCellValue>;

const AppId = process.env.NEXT_PUBLIC_PROJECT_APP,
  TableId = process.env.NEXT_PUBLIC_PROJECT_TABLE;

export class MemberModel extends Stream<Member>(ListModel) {
  client = ownClient;
  baseURI = `Lark/bitable/v1/apps/${AppId}/tables/${TableId}/records`;

  normalize({ id, fields }: TableRecordList<Member>['data']['items'][number]) {
    return { ...fields, id: id! };
  }

  @toggle('downloading')
  async getOne(id: string) {
    const { body } = await this.client.get<TableRecordData<Member>>(
      `${this.baseURI}/${id}`,
    );
    return (this.currentOne = this.normalize(body!.data.record));
  }

  async *openStream(filter: NewData<Member>) {
    var lastPage = '';

    do {
      const { body } = await this.client.get<TableRecordList<Member>>(
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

      yield* items.map(item => this.normalize(item));
    } while (has_more);
  }
}

export default new MemberModel();
