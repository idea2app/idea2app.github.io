import { FC } from 'react';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';

export interface ProjectListLayoutProps {
  defaultData: Project[];
  className?: string;
}

export const ProjectListLayout: FC<ProjectListLayoutProps> = ({ className = '', defaultData }) => (
  <ul className={`${className} grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4`}>
    {defaultData.map(item => (
      <ProjectCard key={String(item.id)} className="h-full" {...item} />
    ))}
  </ul>
);
