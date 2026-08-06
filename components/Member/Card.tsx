import { marked } from 'marked';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';

import { Member } from '../../models/Member';
import { GithubIcon } from '../Layout/Svg';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export type MemberCardProps = Member & Omit<ComponentProps<typeof Card>, 'id'>;

export const MemberCard: FC<MemberCardProps> = observer(
  ({ className = '', id, nickname, skill, position, summary, github, ...props }) => (
    <Card
      className={`relative mb-4 flex break-inside-avoid flex-col gap-3 rounded-2xl p-4 ${className}`}
      {...props}
    >
      {github && (
        <Button asChild size="icon-sm" variant="ghost" className="absolute top-4 right-4">
          <a
            href={`https://github.com/${String(github)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${String(nickname)}'s GitHub account`}
          >
            <GithubIcon />
          </a>
        </Button>
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

      <ul className="scroll-snap-x flex snap-mandatory scrollbar-none flex-nowrap gap-2 overflow-x-scroll">
        {(skill as string[]).map(value => (
          <li key={value}>
            <Badge variant="outline">{value}</Badge>
          </li>
        ))}
      </ul>

      <p
        dangerouslySetInnerHTML={{ __html: marked((summary as string) || '', { async: false }) }}
        className="text-neutral-500"
      />
    </Card>
  ),
);
