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
    className={`elevation-1 hover:elevation-4 relative rounded-2xl border border-gray-200 p-4 dark:border-0 ${className} mb-4 grid break-inside-avoid grid-cols-1 grid-rows-4 gap-2`}
  >
    <a className="row-span-2 flex items-center justify-between" href={`/project/${id}`}>
      <h2 className="text-lg">{String(name)}</h2>
      <Chip label={String(workForm)} />
    </a>
    <ul className="scrollbar-none scroll-snap-x row-span-1 flex snap-mandatory flex-nowrap gap-2 overflow-x-scroll">
      {(type as string[])?.map(value => (
        <Chip
          key={value}
          size="small"
          component="li"
          variant="outlined"
          color="primary"
          label={value}
        />
      ))}
    </ul>
    <div className="row-span-1 flex items-center justify-between">
      <strong className="flex-fill">
        ￥{String(price).replace(/\d/g, (matched, offset) => (offset ? '0' : matched))}+
      </strong>

      <time className="text-sm text-neutral-500">
        🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}
      </time>
    </div>
  </Box>
);
