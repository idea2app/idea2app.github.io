import { Box, Chip } from '@mui/material';
import { ElementType, FC } from 'react';
import { formatDate } from 'web-utility';

import { Project } from '../../models/Project';

export interface ProjectCardProps extends Project {
  className?: string;
  component?: ElementType;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  className = '',
  id,
  name,
  type,
  workForm,
  price,
  settlementDate,
  component = 'li',
}) => (
  <Box
    component={component}
    className={`${className} flex flex-col justify-between gap-4 rounded-2xl border p-4 elevation-1 hover:elevation-8 dark:border-0`}
  >
    <h2 className="flex items-center justify-between">
      <a className="text-lg" title={String(name)} href={`/project/${id}`}>
        {String(name)}
      </a>
      <Chip label={String(workForm)} />
    </h2>
    <ul className="flex flex-row flex-wrap gap-3">
      {(type as string[])?.map(value => (
        <Chip key={value} component="li" size="small" label={value} />
      ))}
    </ul>
    <div className="flex items-center justify-between">
      <strong className="flex-fill">
        ￥{String(price).replace(/\d/g, (matched, offset) => (offset ? '0' : matched))}+
      </strong>

      <time>🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}</time>
    </div>
  </Box>
);
