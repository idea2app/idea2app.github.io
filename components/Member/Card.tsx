import { Avatar, Icon, text2color } from 'idea-react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';
import { Badge, Card, CardProps } from 'react-bootstrap';
import { Markdown } from 'react-marked-renderer';

import { Member } from '../../models/Member';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({
    id,
    className = 'shadow-sm',
    nickname,
    skill,
    position,
    summary,
    github,
    ...props
  }) => (
    <Card className={className} {...props}>
      <Card.Body className="d-flex flex-column gap-3 position-relative">
        <Card.Title as="h3" className="h5 d-flex justify-content-between">
          <Link
            className="stretched-link"
            style={{ lineHeight: '3rem' }}
            href={`/member/${nickname}`}
          >
            {nickname + ''}
          </Link>
          {github && (
            <Avatar src={`https://github.com/${github}.png`} size={3} />
          )}
        </Card.Title>
        {position && <Card.Subtitle>{position + ''}</Card.Subtitle>}

        <Markdown markdown={summary + ''} />
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
