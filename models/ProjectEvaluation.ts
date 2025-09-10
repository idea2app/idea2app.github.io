import { ConsultMessage, Project, ProjectFilter, UserBaseFilter } from '@idea2app/data-server';
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
    // Create a new message item locally first
    const newMessage: ConsultMessage = {
      id: Date.now(), // temporary ID
      content: (data as any).content,
      createdAt: new Date().toISOString(),
      createdBy: userStore.session!,
      project: this.projectId as any,
      ...data
    } as ConsultMessage;

    // Add to local list immediately
    this.restoreList({ allItems: [...this.allItems, newMessage] });

    // Send to server
    const { body } = await (id
      ? this.client.put<ConsultMessage>(`${this.baseURI}/${id}`, data)
      : this.client.post<ConsultMessage>(this.baseURI, data));

    // Update with server response
    const serverMessage = body!;
    this.restoreList({
      allItems: [
        ...this.allItems.slice(0, -1),
        serverMessage
      ]
    });

    // Trigger evaluation after a delay
    this.triggerEvaluation();

    return (this.currentOne = serverMessage);
  }

  private evaluationTimeout?: NodeJS.Timeout;

  private triggerEvaluation = () => {
    // Clear existing timeout
    if (this.evaluationTimeout) {
      clearTimeout(this.evaluationTimeout);
    }

    // Set new timeout for debounced evaluation
    this.evaluationTimeout = setTimeout(async () => {
      try {
        await this.client.post(`project/${this.projectId}/consult-message/evaluation`, {});
        // Refresh messages to get evaluation response
        await this.getList();
      } catch (error) {
        console.error('Failed to trigger evaluation:', error);
      }
    }, 1000); // 1 second debounce
  };
}
