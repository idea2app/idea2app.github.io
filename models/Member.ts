import { BiDataTable, TableCellValue } from 'mobx-lark';

import { LarkBaseId, larkClient } from './Base';

export type Member = Record<'id' | 'name' | 'type', TableCellValue>;

const PROJECT_TABLE = process.env.NEXT_PUBLIC_PROJECT_TABLE!;

export class MemberModel extends BiDataTable<Member>() {
  client = larkClient;

  constructor(appId = LarkBaseId, tableId = PROJECT_TABLE) {
    super(appId, tableId);
  }
}

export default new MemberModel();
