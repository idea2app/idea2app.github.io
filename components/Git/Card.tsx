import { Button, Chip } from '@mui/material';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC } from 'react';

import { i18n } from '../../models/Translation';

export interface GitCardProps
  extends Pick<GitRepository, 'full_name' | 'html_url' | 'languages'>,
    Partial<Pick<GitRepository, 'topics' | 'description' | 'homepage'>> {
  className?: string;
}

export const GitCard: FC<GitCardProps> = observer(
  ({ className = '', full_name, html_url, topics = [], description, homepage }) => (
    <li
      className={`${className} grid grid-cols-1 grid-rows-10 gap-2 rounded-2xl border p-4 elevation-1 hover:elevation-8 dark:border-0`}
    >
      <h3 className="row-span-2 text-lg">
        <a target="_blank" href={html_url} rel="noreferrer">
          {full_name}
        </a>
      </h3>

      <nav className="row-span-3 flex flex-row flex-wrap gap-2">
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

      <p className="row-span-3 text-sm">{description}</p>

      <Button
        className="row-span-2 place-self-center"
        component={Link}
        target="_blank"
        href={homepage ?? html_url}
      >
        {i18n.t('home_page')}
      </Button>
    </li>
  )
);
