import { PrototypeType, PrototypeVersion } from '@idea2app/data-server';

import { TableModel } from './Base';
import userStore from './User';

export class PrototypeVersionModel extends TableModel<PrototypeVersion> {
  baseURI = '';
  client = userStore.client;

  constructor(
    public projectId: number,
    public type: PrototypeType,
  ) {
    super();
    this.baseURI = `project/${projectId}/prototype/${type}/version`;
  }
}
