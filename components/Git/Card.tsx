import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { i18n } from '../../models/Translation';
import { GitLogo } from './Logo';
import { Card, CardActions, CardContent, CardHeader, Chip, Grid2 } from '@mui/material';
import Link from 'next/link';

export interface GitCardProps
  extends Pick<GitRepository, 'full_name' | 'html_url' | 'languages'>,
    Partial<Pick<GitRepository, 'topics' | 'description' | 'homepage'>> {
  className?: string;
}

export const GitCard: FC<GitCardProps> = observer(
  ({
    className = 'shadow-sm',
    full_name,
    html_url,
    languages = [],
    topics = [],
    description,
    homepage
  }) => (
    <Card className={className}>
      <CardContent className="flex flex-col gap-4">
        <CardHeader component="h3">
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        </CardHeader>

        <nav className="flex-fill">
          {topics.map(topic => (
            <Chip
              key={topic}
              className="mr-1"
              component="a"
              target="_blank"
              href={`https://github.com/topics/${topic}`}
              label={topic}
            />
          ))}
        </nav>
        <Grid2 component="ul" className="g-4">
          {languages.map(language => (
            <Grid2 component="li" key={language}>
              <GitLogo name={language} />
            </Grid2>
          ))}
        </Grid2>
        {description}
      </CardContent>
      <CardActions className="flex items-center justify-between">
        {homepage && (
          <Link target="_blank" href={homepage}>
            {i18n.t('home_page')}
          </Link>
        )}
      </CardActions>
    </Card>
  )
);
