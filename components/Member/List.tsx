import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Member } from '../../models/Member';
import { MemberCard } from './Card';

export const MemberListLayout: FC<{ defaultData: Member[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} md={2} lg={3}>
    {defaultData.map(item => (
      <Col as="li" key={item.id + ''}>
        <MemberCard className="h-100 shadow-sm" {...item} />
      </Col>
    ))}
  </Row>
);
