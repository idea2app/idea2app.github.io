import { ConsultMessage, Project, ProjectFilter, UserBaseFilter } from '@idea2app/data-server';
import debounce from 'lodash.debounce';
import { IDType, NewData, toggle } from 'mobx-restful';
import { Second } from 'web-utility';

import { TableModel } from './Base';
import userStore from './User';

export type ExtendedProjectFilter = ProjectFilter & UserBaseFilter;

export class ProjectModel extends TableModel<Project, ExtendedProjectFilter> {
  baseURI = 'project';
  client = userStore.client;
}

export class ConsultMessageModel extends TableModel<ConsultMessage> {
  baseURI = '';
  client = userStore.client;

  constructor(public projectId: number) {
    super();
    this.baseURI = `project/${projectId}/consult-message`;
  }

  @toggle('uploading')
  async updateOne({ content }: Partial<NewData<ConsultMessage>>, id?: IDType) {
    const { allItems } = this;

    const newMessage = {
      id: Date.now(),
      content,
      createdAt: new Date().toJSON(),
      createdBy: userStore.session!,
      project: { id: this.projectId },
    } as ConsultMessage;

    this.restoreList({ allItems: [...allItems, newMessage] });

    const message = await super.updateOne({ content });

    this.restoreList({ allItems: [...allItems, message] });

    this.triggerEvaluation();

    return message;
  }

  private triggerEvaluation = debounce(async () => {
    const { body } = await this.client.post<ConsultMessage>(`${this.baseURI}/evaluation`);

    this.restoreList({ allItems: [...this.allItems, body!] });
  }, Second);
}
