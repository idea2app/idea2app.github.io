import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';
import { Markdown } from 'react-marked-renderer';

import { Member } from '../../models/Member';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardProps, Chip } from '@mui/material';
import { GtihubIcon } from '../Layout/Svg';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ id, className, nickname, skill, position, summary, github, ...props }) => (
    <li
      className={`relative rounded-2xl p-4 elevation-1 hover:elevation-8 ${className} mb-4 flex break-inside-avoid flex-col gap-3`}
    >
      {github && (
        <a
          className="absolute right-4 top-4"
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noreferrer"
        >
          <GtihubIcon />
        </a>
      )}

      <div className="flex w-auto items-center gap-4">
        {github && (
          <img
            className="w-16 rounded-full object-cover"
            src={`https://github.com/${github}.png`}
            alt={`avatar of ${github}`}
            loading="lazy"
          />
        )}

        <Link href={`/member/${nickname}`}>
          <h3 className="text-base">{nickname + ''}</h3>
          <p className="text-sm">{position && position + ''}</p>
        </Link>
      </div>

      <ul>
        {(skill as string[]).map(value => (
          <Chip size="small" key={value} component="li" label={value} />
        ))}
      </ul>

      <Markdown markdown={summary + ''} />
    </li>
  )
);
