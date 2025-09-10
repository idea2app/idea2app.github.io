import { ConsultMessage, Project, ProjectFilter, UserBaseFilter } from '@idea2app/data-server';
import { debounce } from 'lodash';
import { Filter, IDType, toggle } from 'mobx-restful';

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
  async updateOne(data: Filter<ConsultMessage>, id?: IDType) {
    const { content } = data as { content: string };
    
    // Create a new message item locally first
    const newMessage: ConsultMessage = {
      id: Date.now(), // temporary ID
      content: content!,
      createdAt: new Date().toISOString(),
      createdBy: userStore.session!,
      project: { id: this.projectId } as Project,
    } as ConsultMessage;

    // Add to local list immediately
    this.restoreList({ allItems: [...this.allItems, newMessage] });

    // Send to server
    const serverData = { content };
    const { body } = await (id
      ? this.client.put<ConsultMessage>(`${this.baseURI}/${id}`, serverData)
      : this.client.post<ConsultMessage>(this.baseURI, serverData));

    // Update with server response
    const serverMessage = body!;
    this.restoreList({ allItems: [
      ...this.allItems.slice(0, -1),
      serverMessage
    ] });

    // Trigger evaluation after a delay
    this.triggerEvaluation();

    return (this.currentOne = serverMessage);
  }

  private triggerEvaluation = debounce(async () => {
    const { body } = await this.client.post<ConsultMessage>(`${this.baseURI}/evaluation`);

    this.restoreList({ allItems: [...this.allItems, body!] });
  }, 1000);
}
