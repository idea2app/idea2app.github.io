import classNames from 'classnames';
import { FC } from 'react';
import { formatDate } from 'web-utility';

import { Project } from '../../models/Project';
import { Card, CardActions, CardContent, CardHeader, Chip } from '@mui/material';

export interface ProjectCardProps extends Project {
  className?: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  id,
  name,
  type,
  workForm,
  price,
  settlementDate
}) => (
  <Card className={classNames('rounded-3 border', className)}>
    <CardContent className="d-flex flex-column">
      <CardHeader
        component="h3"
        className="flex-fill fs-5 flex items-center"
        actions={
          <a
            className="stretched-link text-truncate mr-auto"
            title={name + ''}
            href={`/project/${id}`}
          >
            {name + ''}
          </a>
        }
        title={<Chip label={workForm + ''} />}
      />
      <ul className="list-inline">
        {(type as string[])?.map(value => (
          <Chip component="li" className="list-inline-item" label={value} key={value} />
        ))}
      </ul>
    </CardContent>
    <CardActions className="flex">
      <strong className="flex-fill">
        ￥{(price + '').replace(/\d/g, (matched, offset) => (offset ? '0' : matched))}+
      </strong>

      <time>🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}</time>
    </CardActions>
  </Card>
);
