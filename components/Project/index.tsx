import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Project } from '../../models/Project';
import { ProjectCard } from './Card';

export const ProjectListLayout: FC<{ defaultData: Project[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} md={2} lg={3}>
    {defaultData.map(item => (
      <Col as="li" key={item.id + ''}>
        <ProjectCard className="h-100 shadow-sm" {...item} />
      </Col>
    ))}
  </Row>
);
