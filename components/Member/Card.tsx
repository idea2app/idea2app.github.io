import { Button, CardProps, Chip, IconButton } from '@mui/material';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';

import { Member } from '../../models/Member';
import { GithubIcon } from '../Layout/Svg';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ className = '', nickname, skill, position, summary, github }) => (
    <li
      className={`elevation-1 hover:elevation-4 relative rounded-2xl border border-gray-200 p-4 dark:border-0 ${className} mb-4 flex break-inside-avoid flex-col gap-3`}
    >
      {github && (
        <IconButton
          component={Link}
          className="!absolute top-4 right-4"
          href={`https://github.com/${String(github)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`${String(nickname)}'s GitHub account`}
        >
          <GithubIcon />
        </IconButton>
      )}

      <div className="flex w-auto items-center gap-4">
        {github && (
          <Link href={`/member/${String(nickname)}`} aria-label={String(nickname)}>
            <img
              style={{ width: '4rem', height: '4rem' }}
              className="rounded-full object-cover"
              src={`https://github.com/${String(github)}.png`}
              alt={String(github)}
            />
          </Link>
        )}
        <hgroup>
          <h4 className="text-base font-bold">{String(nickname)}</h4>
          <p className="text-sm text-neutral-400">{String(position ?? '')}</p>
        </hgroup>
      </div>

      <ul className="scrollbar-none scroll-snap-x flex snap-mandatory flex-nowrap gap-2 overflow-x-scroll">
        {(skill as string[]).map(value => (
          <Chip
            key={value}
            className=""
            size="small"
            component="li"
            variant="outlined"
            color="primary"
            label={value}
          />
        ))}
      </ul>

      <p
        dangerouslySetInnerHTML={{ __html: marked((summary as string) || '', { async: false }) }}
        className="text-neutral-500"
      />
    </li>
  ),
);
