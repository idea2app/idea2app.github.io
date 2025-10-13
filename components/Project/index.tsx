import { FC } from 'react';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';

export interface ProjectListLayoutProps {
  defaultData: Project[];
  className?: string;
}

export const ProjectListLayout: FC<ProjectListLayoutProps> = ({ className = '', defaultData }) => (
  <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {defaultData.map(item => (
      <ProjectCard key={String(item.id)} className="h-full" {...item} />
    ))}
  </ul>
);
