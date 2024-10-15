import { Button, Chip } from '@mui/material';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';

import { i18n } from '../../models/Translation';
import { GitLogo } from './Logo';

export interface GitCardProps
  extends Pick<GitRepository, 'full_name' | 'html_url' | 'languages'>,
    Partial<Pick<GitRepository, 'topics' | 'description' | 'homepage'>> {
  className?: string;
}

export const GitCard: FC<GitCardProps> = observer(
  ({ className = '', full_name, html_url, languages = [], topics = [], description, homepage }) => (
    <li
      className={`${className} flex flex-col items-start justify-between gap-4 rounded-2xl p-4 elevation-1 hover:elevation-8`}
    >
      <h3 className="text-base">
        <a target="_blank" href={html_url} rel="noreferrer">
          {full_name}
        </a>
      </h3>

      <nav className="flex flex-row flex-wrap gap-3">
        {topics.map(topic => (
          <Chip
            key={topic}
            size="small"
            component="a"
            target="_blank"
            href={`https://github.com/topics/${topic}`}
            label={topic}
          />
        ))}
      </nav>

      <ul className="flex gap-3">
        {languages.map(language => (
          <li key={language}>
            <GitLogo name={language} />
          </li>
        ))}
      </ul>

      <p className="text-sm">{description}</p>

      <Button component={Link} target="_blank" href={homepage ?? html_url}>
        {i18n.t('home_page')}
      </Button>
    </li>
  )
);
