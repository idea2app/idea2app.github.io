import { BiDataTable, TableCellValue } from 'mobx-lark';

import { LarkBaseId, larkClient } from './Base';

export type Member = Record<
  | 'id'
  | 'nickname'
  | 'type'
  | 'skill'
  | 'position'
  | 'summary'
  | 'github'
  | 'joinedAt',
  TableCellValue
>;

export const MEMBER_TABLE = process.env.NEXT_PUBLIC_MEMBER_TABLE!,
  MEMBER_VIEW = process.env.NEXT_PUBLIC_MEMBER_VIEW!;

export class MemberModel extends BiDataTable<Member>() {
  client = larkClient;

  requiredKeys = ['nickname', 'position', 'type', 'skill', 'joinedAt'] as const;

  constructor(appId = LarkBaseId, tableId = MEMBER_TABLE) {
    super(appId, tableId);
  }
}

export default new MemberModel();
