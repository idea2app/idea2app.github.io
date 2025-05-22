import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { GitListLayout } from '../components/Git';
import { ScrollListPage } from '../components/Layout/ScrollListPage';
import repositoryStore, { GitRepositoryModel } from '../models/Repository';
import { I18nContext } from '../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, async () => {
  const list = await new GitRepositoryModel('idea2app').getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const GitListPage: FC<{ list: GitRepository[] }> = observer(({ list }) => {
  const { t } = useContext(I18nContext);

  return (
    <ScrollListPage
      title={t('open_source_project')}
      header={t('open_source_project')}
      store={repositoryStore}
      Layout={GitListLayout}
      defaultData={list}
    />
  );
});
export default GitListPage;
