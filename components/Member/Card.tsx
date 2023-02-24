import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Badge, Button, Card, Col, Image } from 'react-bootstrap';

import { Member } from '../../models/Member';

export interface MemberCardProps extends Member {
  className?: string;
}

export const MemberCard: FC<MemberCardProps> = observer(
  ({
    className = 'shadow-sm',
    nickname,
    type,
    skill,
    position,
    summary,
    github,
  }) => (
    <Card className={className}>
      <Card.Body className="d-flex flex-column gap-3">
        <Card.Title as="h3" className="h5 d-flex justify-content-between">
          <span style={{ lineHeight: '3rem' }}>{nickname}</span>
          {github && (
            <Image
              className=""
              style={{ maxHeight: '3rem', borderRadius: '50%' }}
              src={`https://github.com/${github}.png`}
              alt={`${nickname} 's avatar`}
            />
          )}
        </Card.Title>
        {position && <Card.Subtitle>{position}</Card.Subtitle>}

        <Card.Text>{summary}</Card.Text>
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
              <Badge as="li" className="list-inline-item" key={value}>
                {value}
              </Badge>
            ))}
          </ul>
        )}
      </Card.Footer>
    </Card>
  ),
);
