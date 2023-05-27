import { observer } from 'mobx-react';
import { ScrollListProps } from 'mobx-restful-table';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GitRepository, RepositoryModel } from '../../models/Repository';
import { XScrollList } from '../XScrollList';
import { GitCard } from './Card';

export const GitListLayout: FC<{ defaultData: GitRepository[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} sm={2}>
    {defaultData.map(
      item =>
        !!(item.description && item.topics?.length) && (
          <Col as="li" key={item.id}>
            <GitCard className="h-100 shadow-sm" {...item} />
          </Col>
        ),
    )}
  </Row>
);

export interface GitListProps extends ScrollListProps<GitRepository> {
  store: RepositoryModel;
}

@observer
export class GitList extends XScrollList<GitListProps> {
  store = this.props.store;

  constructor(props: GitListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { allItems } = this.store;

    return <GitListLayout defaultData={allItems} />;
  }
}
