import { CardProps, Chip } from '@mui/material';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Member } from '../../models/Member';
import { GithubIcon } from '../Layout/Svg';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ className = '', nickname, skill, position, summary, github }) => (
    <li
      className={`elevation-1 hover:elevation-8 relative rounded-2xl border p-4 dark:border-0 ${className} mb-4 flex break-inside-avoid flex-col gap-3`}
    >
      {github && (
        <a
          className="absolute top-4 right-4"
          href={`https://github.com/${String(github)}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`${String(nickname)}'s GitHub account`}
        >
          <GithubIcon />
        </a>
      )}

      <div className="flex w-auto items-center gap-4">
        {github && (
          <Image
            width={64}
            height={64}
            className="rounded-full object-cover"
            src={`https://github.com/${String(github)}.png`}
            alt={String(github)}
          />
        )}

        <Link href={`/member/${String(nickname)}`} aria-label={String(nickname)}>
          <h2 className="text-base">{String(nickname)}</h2>
          <p className="text-sm">{String(position ?? '')}</p>
        </Link>
      </div>

      <ul className="flex flex-wrap items-center gap-2">
        {(skill as string[]).map(value => (
          <Chip key={value} size="small" component="li" label={value} />
        ))}
      </ul>

      <div dangerouslySetInnerHTML={{ __html: marked(summary as string) }} />
    </li>
  ),
);
