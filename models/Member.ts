import { BiDataTable, TableCellValue } from 'mobx-lark';

import { LarkBaseId, larkClient } from './Base';

export type Member = Record<
  'id' | 'nickname' | 'type' | 'skill' | 'position' | 'summary' | 'github',
  TableCellValue
>;

const MEMBER_TABLE = process.env.NEXT_PUBLIC_MEMBER_TABLE!;

export class MemberModel extends BiDataTable<Member>() {
  client = larkClient;

  constructor(appId = LarkBaseId, tableId = MEMBER_TABLE) {
    super(appId, tableId);
  }
}

export default new MemberModel();
