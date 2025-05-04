import { Grid } from '@mui/material';
import { Issue } from 'mobx-github';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { IssueCard } from '../../../components/Git/Issue/Card';
import { PageHead } from '../../../components/PageHead';
import { ScrollList } from '../../../components/ScrollList';
import issueStore, { IssueFilter, IssueModel } from '../../../models/Issue';
import { i18n } from '../../../models/Translation';

const issueFilter: IssueFilter = {
  repository_url: 'https://github.com/idea2app',
  state: 'open',
  title: 'reward',
};

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new IssueModel().getList(issueFilter);

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const IssuesPage: FC<{ list: Issue[] }> = observer(({ list }) => (
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
));

export default IssuesPage;
