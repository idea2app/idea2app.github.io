import { Base } from '@idea2app/data-server';
import { toggle } from 'mobx-restful';

import { TableModel } from './Base';
import userStore from './User';

export enum PrototypeVersionStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class PrototypeVersion extends Base {
  projectId!: number;
  messageId!: number;
  status!: PrototypeVersionStatus;
  previewUrl?: string;
  logUrl?: string;
  errorMessage?: string;
}

export class PrototypeVersionModel extends TableModel<PrototypeVersion> {
  baseURI = '';
  client = userStore.client;

  constructor(public projectId: number) {
    super();
    this.baseURI = `project/${projectId}/prototype-version`;
  }

  @toggle('uploading')
  async createVersion(messageId: number) {
    const version = await this.client.post<PrototypeVersion>(`${this.baseURI}`, {
      messageId,
    });
    return version.body;
  }

  @toggle('downloading')
  async getVersionByMessageId(messageId: number): Promise<PrototypeVersion | null> {
    try {
      const { body } = await this.client.get<PrototypeVersion>(
        `${this.baseURI}/message/${messageId}`,
      );
      return body || null;
    } catch (error) {
      return null;
    }
  }
}
