import { Avatar, Card, CardContent, CardProps, Chip } from '@mui/material';
import { marked } from 'marked';
import { Issue } from 'mobx-github';
import { FC, useEffect, useState } from 'react';

import { SymbolIcon } from '../../Icon';

export type IssueCardProps = Issue & Omit<CardProps, 'id'>;

export const IssueCard: FC<IssueCardProps> = ({
  id,
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
}) => {
  const [parsedBody, setParsedBody] = useState<string>('');

  useEffect(() => {
    if (body) {
      const parseMarkdown = async () => {
        const html = await marked.parse(body);
        setParsedBody(html);
      };
      parseMarkdown();
    }
  }, [body]);

  return (
  <Card {...props}>
    <CardContent className="flex h-full flex-col justify-between gap-2">
      <h2 className="text-2xl font-semibold">
        <a
          href={html_url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {repository_url.split('/').slice(-2).join('/')}#{number}
          <br />
          {title}
        </a>
      </h2>

      <div className="flex items-center gap-2">
        {labels?.map(
          label =>
            typeof label === 'object' && (
              <Chip
                key={label.name}
                label={label.name}
                style={{ backgroundColor: `#${label.color || 'e0e0e0'}` }}
              />
            ),
        )}
      </div>

      <article dangerouslySetInnerHTML={{ __html: parsedBody }} />

      <footer className="flex items-center justify-between">
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
        <time dateTime={created_at}>{new Date(created_at).toLocaleString()}</time>
      </footer>
    </CardContent>
  </Card>
);
};
