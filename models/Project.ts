import {
  BiDataQueryOptions,
  BiDataTable,
  makeSimpleFilter,
  normalizeText,
  TableCellLink,
  TableCellValue,
  TableRecord,
} from 'mobx-lark';
import { NewData } from 'mobx-restful';
import { isEmpty } from 'web-utility';

import { larkClient } from './Base';
import { LarkBaseId } from './configuration';

export type Project = Record<
  | 'id'
  | 'name'
  | 'type'
  | 'workForm'
  | 'leader'
  | 'members'
  | 'price'
  | 'startDate'
  | 'settlementDate'
  | 'remark'
  | 'image'
  | 'openSource'
  | 'link',
  TableCellValue
>;

const PROJECT_TABLE = process.env.NEXT_PUBLIC_PROJECT_TABLE!;

export class ProjectModel extends BiDataTable<Project>() {
  client = larkClient;

  sort = { settlementDate: 'DESC' } as const;

  queryOptions: BiDataQueryOptions = { text_field_as_array: false };

  constructor(appId = LarkBaseId, tableId = PROJECT_TABLE) {
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

  extractFields({ id, fields: { link, ...fields } }: TableRecord<Project>) {
    return {
      ...fields,
      id,
      link: link && normalizeText(link as TableCellLink),
    };
  }
}

export default new ProjectModel();
