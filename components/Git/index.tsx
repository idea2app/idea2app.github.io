import { GitRepository } from 'mobx-github';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GitCard } from './Card';

export const GitListLayout: FC<{ defaultData: GitRepository[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} md={2} xl={3}>
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
