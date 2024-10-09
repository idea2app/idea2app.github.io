import { FC } from 'react';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';
import { Grid2, Grid2Props } from '@mui/material';

export interface ProjectListLayoutProps extends Grid2Props {
  defaultData: Project[];
}

export const ProjectListLayout: FC<ProjectListLayoutProps> = ({
  className = 'g-4',
  defaultData,
  ...props
}) => (
  <Grid2 component="ul" className={`list-unstyled ${className}`} {...props}>
    {defaultData.map(item => (
      <Grid2 component="li" key={item.id + ''}>
        <ProjectCard className="h-100 shadow-sm" {...item} />
      </Grid2>
    ))}
  </Grid2>
);
