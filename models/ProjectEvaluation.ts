import { Project, ConsultMessage, ProjectFilter, UserBaseFilter } from '@idea2app/data-server';

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
}
