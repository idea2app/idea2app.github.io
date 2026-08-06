import { marked } from 'marked';
import { Issue } from 'mobx-github';
import { FC } from 'react';

import { SymbolIcon } from '../../Icon';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';

export type IssueCardProps = Issue & { className?: string };

export const IssueCard: FC<IssueCardProps> = ({
  id,
  className = '',
  repository_url,
  number,
  title,
  labels,
  body,
  html_url,
  user,
  comments,
  created_at,
  ...props
}) => (
  <Card
    className={`relative mb-4 grid break-inside-avoid grid-cols-1 grid-rows-5 gap-2 rounded-2xl p-4 ${className}`}
    {...props}
  >
    <a
      className="row-span-1 text-2xl font-semibold"
      href={html_url}
      target="_blank"
      rel="noreferrer"
    >
      <h2 className="text-lg">
        {title}#{number}
      </h2>
    </a>

    <ul className="scroll-snap-x row-span-1 flex snap-mandatory scrollbar-none flex-nowrap gap-2 overflow-x-scroll">
      {labels?.map(
        label =>
          typeof label === 'object' && (
            <li key={label.name}>
              <Badge variant="outline">{label.name}</Badge>
            </li>
          ),
      )}
    </ul>

    <article
      dangerouslySetInnerHTML={{ __html: marked(body || '', { async: false }) }}
      className="row-span-3"
    />

    <footer className="row-span-1 flex items-center justify-between text-neutral-500">
      {user && (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar_url} alt={user.name || ''} />
          </Avatar>
          {user.name || ''}
        </div>
      )}
      <div className="flex items-center gap-2">
        <SymbolIcon name="chat" />
        {comments}
      </div>
      <time className="text-sm" dateTime={created_at}>
        {new Date(created_at).toLocaleString()}
      </time>
    </footer>
  </Card>
);
