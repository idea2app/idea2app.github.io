import { Project, ConsultMessage, ProjectFilter, UserBaseFilter } from '@idea2app/data-server';
import { Filter } from 'mobx-restful';

import { TableModel } from './Base';
import userStore from './User';

// Combine ProjectFilter with UserBaseFilter to support role-based filtering
export interface ExtendedProjectFilter extends ProjectFilter {
  createdBy?: number;
}

export interface ConsultMessageFilter extends Filter<ConsultMessage> {
  project?: string;
  user?: string;
}

export class ProjectModel extends TableModel<Project, ExtendedProjectFilter> {
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