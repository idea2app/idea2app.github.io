import { BiDataTable, TableCellValue } from 'mobx-lark';

import { LarkBaseId, larkClient } from './Base';

export type Client = Record<
  'id' | 'name' | 'type' | 'image' | 'summary' | 'partnership',
  TableCellValue
>;

const CLIENT_TABLE = process.env.NEXT_PUBLIC_CLIENT_TABLE!;

export class ClientModel extends BiDataTable<Client>() {
  client = larkClient;

  constructor(appId = LarkBaseId, tableId = CLIENT_TABLE) {
    super(appId, tableId);
  }
}
