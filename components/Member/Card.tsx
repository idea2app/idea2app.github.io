import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';
import { Markdown } from 'react-marked-renderer';

import { Member } from '../../models/Member';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardProps, Chip } from '@mui/material';
import { GtihubIcon } from '../Layout/Svg';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ id, className = 'shadow-sm', nickname, skill, position, summary, github, ...props }) => (
    <Card className={className} {...props}>
      <CardContent className="d-flex flex-column position-relative gap-3">
        <CardHeader
          component="h3"
          className="h5 d-flex justify-content-between"
          avatar={github && <Avatar src={`https://github.com/${github}.png`} alt="github avatar" />}
          action={
            <Link
              className="stretched-link"
              style={{ lineHeight: '3rem' }}
              href={`/member/${nickname}`}
            >
              {nickname + ''}
            </Link>
          }
          subheader={position && position + ''}
        />

        <Markdown markdown={summary + ''} />
      </CardContent>

      <CardActions>
        {github && (
          <a
            className="fs-2"
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noreferrer"
          >
            <GtihubIcon />
          </a>
        )}
        {skill && (
          <ul>
            {(skill as string[]).map(value => (
              <Chip key={value} component="li" label={value} />
            ))}
          </ul>
        )}
      </CardActions>
    </Card>
  )
);
