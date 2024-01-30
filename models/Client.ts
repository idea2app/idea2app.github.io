import { BiDataQueryOptions, BiDataTable, TableCellValue } from 'mobx-lark';

import { LarkBaseId, larkClient } from './Base';

export type Client = Record<
  'id' | 'name' | 'type' | 'partnership' | 'image' | 'summary' | 'address',
  TableCellValue
>;

const CLIENT_TABLE = process.env.NEXT_PUBLIC_CLIENT_TABLE!;

export class ClientModel extends BiDataTable<Client>() {
  client = larkClient;

  queryOptions: BiDataQueryOptions = { text_field_as_array: false };

  constructor(appId = LarkBaseId, tableId = CLIENT_TABLE) {
    super(appId, tableId);
  }
}
