import { BiDataTable, makeSimpleFilter, TableCellValue } from 'mobx-lark';
import { NewData } from 'mobx-restful';
import { isEmpty } from 'web-utility';

import { larkClient } from './Base';

export type Project = Record<
  | 'id'
  | 'name'
  | 'type'
  | 'workForm'
  | 'price'
  | 'startDate'
  | 'settlementDate'
  | 'remark'
  | 'image'
  | 'openSource',
  TableCellValue
>;

const AppId = process.env.NEXT_PUBLIC_PROJECT_APP!,
  TableId = process.env.NEXT_PUBLIC_PROJECT_TABLE!;

export class ProjectModel extends BiDataTable<Project>() {
  client = larkClient;

  sort = { settlementDate: 'DESC' } as const;

  constructor(appId = AppId, tableId = TableId) {
    super(appId, tableId);
  }

  makeFilter(filter: NewData<Project>) {
    return [
      'NOT(CurrentValue.[settlementDate]="")',
      isEmpty(filter) ? undefined : makeSimpleFilter(filter),
    ]
      .filter(Boolean)
      .join('&&');
  }
}

export default new ProjectModel();
