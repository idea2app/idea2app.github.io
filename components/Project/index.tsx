import { observer } from 'mobx-react';
import { ScrollListProps } from 'mobx-restful-table';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Project, ProjectModel } from '../../models/Project';
import { XScrollList } from '../XScrollList';
import { ProjectCard } from './Card';

export const ProjectListLayout: FC<{ defaultData: Project[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} sm={2} md={3}>
    {defaultData.map(item => (
      <Col as="li" key={item.id + ''}>
        <ProjectCard className="h-100 shadow-sm" {...item} />
      </Col>
    ))}
  </Row>
);

export interface ProjectListProps extends ScrollListProps<Project> {
  store: ProjectModel;
}

@observer
export class ProjectList extends XScrollList<ProjectListProps> {
  store = this.props.store;

  constructor(props: ProjectListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { allItems } = this.store;

    return <ProjectListLayout defaultData={allItems} />;
  }
}
