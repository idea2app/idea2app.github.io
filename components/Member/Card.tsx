import { Avatar, Icon, text2color } from 'idea-react';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Badge, Card } from 'react-bootstrap';

import { Member } from '../../models/Member';

export interface MemberCardProps extends Member {
  className?: string;
}

export const MemberCard: FC<MemberCardProps> = observer(
  ({ className = 'shadow-sm', nickname, skill, position, summary, github }) => (
    <Card className={className}>
      <Card.Body className="d-flex flex-column gap-3">
        <Card.Title as="h3" className="h5 d-flex justify-content-between">
          <span style={{ lineHeight: '3rem' }}>{nickname + ''}</span>
          {github && (
            <Avatar src={`https://github.com/${github}.png`} size={3} />
          )}
        </Card.Title>
        {position && <Card.Subtitle>{position + ''}</Card.Subtitle>}

        <Card.Text>{summary + ''}</Card.Text>
      </Card.Body>

      <Card.Footer>
        {github && (
          <a
            className="fs-2"
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name={'github'} />
          </a>
        )}
        {skill && (
          <ul className="list-inline">
            {(skill as string[]).map(value => (
              <Badge
                key={value}
                as="li"
                className="list-inline-item"
                bg={text2color(value, ['light'])}
              >
                {value}
              </Badge>
            ))}
          </ul>
        )}
      </Card.Footer>
    </Card>
  ),
);
