import { Project, ConsultMessage } from '@idea2app/data-server';
import { Filter } from 'mobx-restful';

import { larkClient, TableModel } from './Base';

export interface ProjectFilter extends Filter<Project> {
  owner?: string;
  status?: string;
}

export interface ConsultMessageFilter extends Filter<ConsultMessage> {
  project?: string;
  user?: string;
}

export class ProjectModel extends TableModel<Project, ProjectFilter> {
  client = larkClient;
  baseURI = '/api/project';
}

export class ConsultMessageModel extends TableModel<ConsultMessage, ConsultMessageFilter> {
  client = larkClient;
  baseURI = '/api/consult-message';
}

// Legacy compatibility
export interface ProjectEvaluationFilter extends ConsultMessageFilter {
  projectId?: string;
}

export class ProjectEvaluationModel extends ConsultMessageModel {
  // Compatibility method
  async loadPage(pageIndex: number, pageSize: number, filter: ProjectEvaluationFilter) {
    // Convert legacy projectId filter to new project filter
    const newFilter: ConsultMessageFilter = { ...filter };
    if (filter.projectId) {
      newFilter.project = filter.projectId;
      delete (newFilter as any).projectId;
    }
    return super.loadPage(pageIndex, pageSize, newFilter);
  }
}

export default new ProjectEvaluationModel();