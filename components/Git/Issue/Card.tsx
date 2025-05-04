import { Avatar, Card, CardContent, CardProps, Chip, Icon, Stack, Typography } from '@mui/material';
import { marked } from 'marked';
import { Issue } from 'mobx-github';
import { FC } from 'react';

export type IssueCardProps = Issue & Omit<CardProps, 'id'>;

export const IssueCard: FC<IssueCardProps> = ({
  id,
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
  <Card {...props}>
    <CardContent>
      <Typography
        variant="h4"
        component="a"
        href={html_url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        #{number} {title}
      </Typography>

      <Stack direction="row" spacing={1}>
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
      </Stack>

      <Typography component="article" dangerouslySetInnerHTML={{ __html: marked(body || '') }} />

      {user && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src={user.avatar_url} alt={user.name || ''} />
          <Typography>{user.name || ''}</Typography>
        </Stack>
      )}
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon>chat_bubble_outline</Icon>
        {comments}
      </Stack>

      <time dateTime={created_at}>{new Date(created_at).toLocaleString()}</time>
    </CardContent>
  </Card>
);
