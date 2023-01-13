import { observer } from 'mobx-react';
import { ScrollListProps } from 'mobx-restful-table';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Member, MemberModel } from '../models/Member';
import { XScrollList } from './XScrollList';

export const MemberListLayout: FC<{ defaultData: Member[] }> = ({
  defaultData,
}) => (
  <Row as="ul" className="list-unstyled g-4" xs={1} sm={2} md={3}>
    {defaultData.map(item => (
      <Col as="li" key={item.id + ''}>
        {/* <MemberCard className="h-100 shadow-sm" {...item} /> */}
      </Col>
    ))}
  </Row>
);

export interface MemberListProps extends ScrollListProps<Member> {
  store: MemberModel;
}

@observer
export class MemberList extends XScrollList<MemberListProps> {
  store = this.props.store;

  constructor(props: MemberListProps) {
    super(props);

    this.boot();
  }

  renderList() {
    const { allItems } = this.store;

    return <MemberListLayout defaultData={allItems} />;
  }
}
