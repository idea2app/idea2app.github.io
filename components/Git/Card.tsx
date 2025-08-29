import { Button, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import { SymbolIcon } from '../Icon';
import { GitpodIcon, OcticonIcon } from '../Layout/Svg';

export interface GitCardProps
  extends Pick<GitRepository, 'full_name' | 'html_url' | 'languages'>,
    Partial<Pick<GitRepository, 'topics' | 'description' | 'homepage'>> {
  className?: string;
}

export const GitCard: FC<GitCardProps> = observer(
  ({ className = '', full_name, html_url, topics = [], description, homepage }) => {
    const { t } = useContext(I18nContext);

    return (
      <li
        className={`${className} elevation-1 hover:elevation-4 grid grid-cols-1 grid-rows-6 gap-2 rounded-2xl border border-gray-200 p-4 dark:border-0`}
      >
        <h3 className="row-span-1 text-lg">
          <a target="_blank" href={html_url} rel="noreferrer">
            {full_name}
          </a>
        </h3>

        <nav className="scrollbar-none row-span-1 flex snap-x snap-mandatory flex-row flex-nowrap gap-2 overflow-x-scroll">
          {topics.map(topic => (
            <Chip
              key={topic}
              size="small"
              color="info"
              variant="outlined"
              component={Link}
              target="_blank"
              href={`https://github.com/topics/${topic}`}
              label={topic}
              clickable
            />
          ))}
        </nav>

        <p className="row-span-3 text-sm text-neutral-500">{description}</p>
        <div className="row-span-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tooltip title="Codespaces">
              <IconButton
                component="a"
                target="_blank"
                href={`https://codespaces.new/${full_name}`}
                rel="noreferrer"
              >
                <OcticonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Gitpod">
              <IconButton
                component="a"
                target="_blank"
                href={`https://gitpod.io/?autostart=true#${html_url}`}
                rel="noreferrer"
              >
                <GitpodIcon className="h-6 w-6 font-extralight dark:fill-white" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Code">
              <IconButton component="a" target="_blank" href={html_url} rel="noreferrer">
                <SymbolIcon name="code" />
              </IconButton>
            </Tooltip>
          </div>

          <Button
            component="a"
            className="!rounded-full"
            variant="contained"
            color="info"
            target="_blank"
            href={homepage ?? html_url}
            disabled={!(homepage ?? html_url)}
            startIcon={<SymbolIcon name="visibility" />}
          >
            {t('preview')}
          </Button>
        </div>
      </li>
    );
  },
);
