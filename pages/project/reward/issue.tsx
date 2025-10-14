import { Grid } from '@mui/material';
import { Issue } from 'mobx-github';
import { observer } from 'mobx-react';
import { compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { IssueCard } from '../../../components/Git/Issue/Card';
import { PageHead } from '../../../components/PageHead';
import { ScrollList } from '../../../components/ScrollList';
import issueStore, { IssueFilter, IssueModel } from '../../../models/Issue';
import { I18nContext } from '../../../models/Translation';
import { githubOAuth } from '../../api/GitHub/core';

const issueFilter: IssueFilter = {
  repository_url: 'https://github.com/idea2app',
  state: 'open',
  title: 'reward',
};

export const getServerSideProps = compose(githubOAuth, errorLogger, async () => {
  const list = await new IssueModel().getList(issueFilter);

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const IssuesPage: FC<{ list: Issue[] }> = observer(({ list }) => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  return (
    <div className="container mx-auto max-w-screen-xl px-4 pt-16 pb-6">
      <PageHead title={t('github_reward_issues')} />

      <h1 className="my-8 text-4xl font-semibold">{t('github_reward_issues')}</h1>

      <ScrollList
        translator={i18n}
        store={issueStore}
        filter={issueFilter}
        defaultData={list}
        renderList={allItems => (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allItems.map(issue => (
              <IssueCard key={issue.id} className="h-full" {...issue} />
            ))}
          </ul>
        )}
      />
    </div>
  );
});

export default IssuesPage;
