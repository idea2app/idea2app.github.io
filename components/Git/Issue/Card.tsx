import { Avatar, Box, CardProps, Chip } from '@mui/material';
import { marked } from 'marked';
import { Issue } from 'mobx-github';
import { FC } from 'react';

import { SymbolIcon } from '../../Icon';

export type IssueCardProps = Issue & Omit<CardProps, 'id'>;

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
  component = 'li',
  ...props
}) => (
  <Box
    className={`elevation-1 hover:elevation-4 relative mb-4 grid break-inside-avoid grid-cols-1 grid-rows-5 gap-2 rounded-2xl border border-gray-200 p-4 dark:border-0 ${className}`}
    component={component}
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

    <ul className="scrollbar-none scroll-snap-x row-span-1 flex snap-mandatory flex-nowrap gap-2 overflow-x-scroll">
      {labels?.map(
        label =>
          typeof label === 'object' && (
            <Chip
              key={label.name}
              size="small"
              component="li"
              variant="outlined"
              color="primary"
              label={label.name}
            />
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
          <Avatar src={user.avatar_url} alt={user.name || ''} />
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
  </Box>
);
