import { FC } from 'react';
import { Col, Row, RowProps } from 'react-bootstrap';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';

export interface ProjectListLayoutProps extends RowProps {
  defaultData: Project[];
}

export const ProjectListLayout: FC<ProjectListLayoutProps> = ({
  className = 'g-4',
  defaultData,
  ...props
}) => (
  <Row
    as="ul"
    className={`list-unstyled ${className}`}
    xs={1}
    md={2}
    lg={3}
    {...props}
  >
    {defaultData.map(item => (
      <Col as="li" key={item.id + ''}>
        <ProjectCard className="h-100 shadow-sm" {...item} />
      </Col>
    ))}
  </Row>
);
