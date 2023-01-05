import classNames from 'classnames';
import { text2color } from 'idea-react';
import Link from 'next/link';
import { FC } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { Project } from '../../models/Project';
import styles from './Card.module.less';

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
  settlementDate,
}) => (
  <Card className={classNames('rounded-3 border', styles.card, className)}>
    <Card.Body className="d-flex flex-column">
      <Card.Title as="h3" className="flex-fill fs-5 d-flex align-items-center">
        <Link href={`/project/${id}`} passHref>
          <a className="stretched-link text-truncate me-auto" title={name + ''}>
            {name}
          </a>
        </Link>
        <Badge bg={text2color(workForm + '', ['light'])}>{workForm}</Badge>
      </Card.Title>
      <ul className="list-inline ">
        {(type as string[])?.map(value => (
          <Badge
            as="li"
            className="list-inline-item"
            bg={text2color(value, ['light'])}
            key={value}
          >
            {value}
          </Badge>
        ))}
      </ul>
    </Card.Body>
    <Card.Footer className="d-flex">
      <strong className="flex-fill">￥{price}</strong>
      <time>🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}</time>
    </Card.Footer>
  </Card>
);
