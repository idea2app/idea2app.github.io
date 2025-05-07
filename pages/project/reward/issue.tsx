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

  return (
    <Grid container className="px-4 py-20">
      <PageHead title="GitHub-reward issues" />

      <h1>GitHub-reward issues</h1>

      <ScrollList
        translator={i18n}
        store={issueStore}
        filter={issueFilter}
        defaultData={list}
        renderList={allItems => (
          <Grid container spacing={2}>
            {allItems.map(issue => (
              <Grid key={issue.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <IssueCard className="h-full" {...issue} />
              </Grid>
            ))}
          </Grid>
        )}
      />
    </Grid>
  );
});

export default IssuesPage;
