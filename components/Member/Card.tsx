import { CardProps, Chip } from '@mui/material';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Markdown } from 'react-marked-renderer';

import { Member } from '../../models/Member';
import { GithubIcon } from '../Layout/Svg';

export type MemberCardProps = Member & Omit<CardProps, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ className = '', nickname, skill, position, summary, github }) => (
    <li
      className={`relative rounded-2xl p-4 elevation-1 hover:elevation-8 ${className} mb-4 flex break-inside-avoid flex-col gap-3`}
    >
      {github && (
        <a
          className="absolute right-4 top-4"
          href={`https://github.com/${String(github)}`}
          target="_blank"
          rel="noreferrer"
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

        <Link href={`/member/${String(nickname)}`}>
          <h3 className="text-base">{String(nickname)}</h3>
          <p className="text-sm">{String(position ?? '')}</p>
        </Link>
      </div>

      <ul>
        {(skill as string[]).map(value => (
          <Chip key={value} size="small" component="li" label={value} />
        ))}
      </ul>

      <Markdown markdown={String(summary)} />
    </li>
  )
);
