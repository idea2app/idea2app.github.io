import { BiDataQueryOptions, BiDataTable, TableCellValue } from 'mobx-lark';

import { larkClient } from './Base';
import { LarkBaseId } from './configuration';

export type Member = Record<
  'id' | 'nickname' | 'type' | 'skill' | 'position' | 'summary' | 'github' | 'joinedAt',
  TableCellValue
>;

export const MEMBER_TABLE = process.env.NEXT_PUBLIC_MEMBER_TABLE!,
  MEMBER_VIEW = process.env.NEXT_PUBLIC_MEMBER_VIEW!;

export class MemberModel extends BiDataTable<Member>() {
  client = larkClient;

  pageSize = 20;

  requiredKeys = ['nickname', 'position', 'type', 'skill', 'joinedAt'] as const;

  queryOptions: BiDataQueryOptions = { text_field_as_array: false };

  constructor(appId = LarkBaseId, tableId = MEMBER_TABLE) {
    super(appId, tableId);
  }
}

export default new MemberModel();
