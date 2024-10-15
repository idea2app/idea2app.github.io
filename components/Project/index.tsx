import { FC } from 'react';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';

export interface ProjectListLayoutProps {
  defaultData: Project[];
  className?: string;
}

export const ProjectListLayout: FC<ProjectListLayoutProps> = ({ className = '', defaultData }) => (
  <ul className={`list-unstyled ${className}`}>
    {defaultData.map(item => (
      <li key={String(item.id)}>
        <ProjectCard className="h-100 shadow-sm" {...item} />
      </li>
    ))}
  </ul>
);
