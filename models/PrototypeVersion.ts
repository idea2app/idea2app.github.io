import { PrototypeType, PrototypeVersion } from '@idea2app/data-server';
import { toggle } from 'mobx-restful';

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

  @toggle('downloading')
  async getVersionByMessageId(messageId: number) {
    try {
      const { body } = await this.client.get<PrototypeVersion>(
        `${this.baseURI}/message/${messageId}`,
      );
      return body;
    } catch (error: any) {
      if (error?.response?.status === 404) return;

      console.error('Failed to fetch prototype version:', error);
    }
  }
}
