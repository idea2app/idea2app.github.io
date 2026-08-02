import { ElementType, FC } from 'react';
import { formatDate } from 'web-utility';

import { Project } from '../../models/Project';
import { Badge } from '../ui/badge';

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
  component: Tag = 'li',
  ...props
}) => (
  <Tag
    className={`bg-card text-card-foreground relative mb-4 grid break-inside-avoid grid-cols-1 grid-rows-4 gap-2 rounded-2xl border p-4 ${className}`}
    {...props}
  >
    <a className="row-span-2 flex items-center justify-between" href={`/project/${id}`}>
      <h2 className="text-lg">{String(name)}</h2>
      <Badge variant="secondary">{String(workForm)}</Badge>
    </a>
    <ul className="scroll-snap-x row-span-1 flex snap-mandatory scrollbar-none flex-nowrap gap-2 overflow-x-scroll">
      {(type as string[])?.map(value => (
        <li key={value}>
          <Badge variant="outline">{value}</Badge>
        </li>
      ))}
    </ul>
    <div className="row-span-1 flex items-center justify-between">
      <strong className="flex-fill">
        ￥{String(price).replace(/\d/g, (matched, offset) => (offset ? '0' : matched))}+
      </strong>

      <time className="text-sm text-neutral-500">🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}</time>
    </div>
  </Tag>
);
