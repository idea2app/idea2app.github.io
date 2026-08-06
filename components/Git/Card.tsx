import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { GithubIcon, GitpodIcon, OcticonIcon } from '../Layout/Svg';
import { GitLogo } from './Logo';

export interface GitCardProps
  extends
    Pick<GitRepository, 'full_name' | 'html_url' | 'languages'>,
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
    homepage,
  }) => {
    const { t } = useContext(I18nContext);

    return (
      <Card className={`flex h-full flex-col ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            <a
              className="underline-offset-4 hover:underline"
              target="_blank"
              href={html_url}
              rel="noreferrer"
            >
              {full_name}
            </a>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 pt-0">
          <nav className="flex min-h-16 snap-x snap-mandatory scrollbar-none flex-row flex-nowrap gap-2 overflow-x-scroll">
            {topics.map(topic => (
              <a
                key={topic}
                target="_blank"
                rel="noreferrer"
                href={`https://github.com/topics/${topic}`}
              >
                <Badge variant="secondary">{topic}</Badge>
              </a>
            ))}
          </nav>

          <ul className="grid list-none grid-cols-4 gap-4 p-0">
            {languages.map(language => (
              <li key={language}>
                <GitLogo name={language} />
              </li>
            ))}
          </ul>

          {description && <p className="text-muted-foreground flex-1 text-sm">{description}</p>}
        </CardContent>

        <CardFooter className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <a target="_blank" rel="noreferrer" href={html_url} aria-label="source code">
              <GithubIcon className="size-4" /> Source
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://codespaces.new/${full_name}`}
              aria-label="open in GitHub Codespaces"
            >
              <OcticonIcon className="size-4" /> Codespaces
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://gitpod.io/?autostart=true#${html_url}`}
              aria-label="open in Gitpod"
            >
              <GitpodIcon className="size-4" /> Gitpod
            </a>
          </Button>
          {(homepage || html_url) && (
            <Button variant="secondary" size="sm" asChild>
              <a target="_blank" rel="noreferrer" href={homepage || html_url}>
                {t('preview') || t('home_page')}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  },
);
