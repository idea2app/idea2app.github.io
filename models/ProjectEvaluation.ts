import { ProjectEvaluation } from '@idea2app/data-server';
import { Filter } from 'mobx-restful';

import { larkClient, TableModel } from './Base';

export interface ProjectEvaluationFilter extends Filter<ProjectEvaluation> {
  projectId?: string;
}

export class ProjectEvaluationModel extends TableModel<ProjectEvaluation, ProjectEvaluationFilter> {
  client = larkClient;
  baseURI = '/api/project/evaluation';

  // Mock data for demonstration - this would be replaced with real API calls
  async loadPage(pageIndex: number, pageSize: number, filter: ProjectEvaluationFilter) {
    // For now, return mock data
    const mockData: ProjectEvaluation[] = [
      {
        id: '1',
        message: `你好！我是 AI 评估助手，我将为项目"${filter.projectId}"进行技术评估。`,
        user: undefined, // Bot message
        timestamp: new Date(Date.now() - 5000).toISOString(),
      },
      {
        id: '2',
        message: '基于项目需求，我已完成初步评估：',
        evaluation: {
          techStack: ['React', 'TypeScript', 'Next.js', 'Material-UI'],
          difficulty: '中等',
          timeline: '8-12 周',
          cost: '¥150,000 - ¥200,000',
          architecture: `
            <ul>
              <li>前端：React + TypeScript + Next.js</li>
              <li>后端：Node.js + Express</li>
              <li>数据库：PostgreSQL</li>
              <li>部署：Vercel + Docker</li>
            </ul>
          `,
          keyFeatures: '用户管理、数据可视化、实时通知',
          riskAssessment: '技术栈成熟稳定，团队需要有 React 经验',
        },
        user: undefined, // Bot message
        timestamp: new Date(Date.now() - 3000).toISOString(),
      },
      {
        id: '3',
        message: '感谢评估！请问能否提供更详细的开发计划？',
        user: {
          id: 'user1',
          name: '项目经理',
          email: 'pm@example.com',
        },
        timestamp: new Date(Date.now() - 1000).toISOString(),
      },
    ];

    // Filter by projectId if provided
    let filteredData = mockData;
    if (filter.projectId) {
      // In a real implementation, this would filter by project ID
      filteredData = mockData;
    }

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);

    return {
      pageData,
      totalCount: filteredData.length,
    };
  }
}

export default new ProjectEvaluationModel();