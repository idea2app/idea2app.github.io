import { Project, ConsultMessage } from '@idea2app/data-server';
import { Filter } from 'mobx-restful';

import { TableModel } from './Base';
import userStore from './User';

export interface ProjectFilter extends Filter<Project> {
  owner?: string;
  status?: string;
  createdBy?: string;
}

export interface ConsultMessageFilter extends Filter<ConsultMessage> {
  project?: string;
  user?: string;
}

export class ProjectModel extends TableModel<Project, ProjectFilter> {
  client = userStore.client;
  baseURI = 'project';
}

export class ConsultMessageModel extends TableModel<ConsultMessage, ConsultMessageFilter> {
  client = userStore.client;
  baseURI: string;

  constructor(public projectId: number) {
    super();
    this.baseURI = `project/${projectId}/consult-message`;
  }
}