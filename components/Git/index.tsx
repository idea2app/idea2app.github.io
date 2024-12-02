import { GitRepository } from 'mobx-github';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GitCard } from './Card';

export const GitListLayout: FC<{ defaultData: GitRepository[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} md={2} xl={3}>
    {defaultData.map(item => (
      <Col key={item.id} as="li">
        <GitCard className="h-100 shadow-sm" {...item} />
      </Col>
    ))}
  </Row>
);
