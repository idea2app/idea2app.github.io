import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { GetStaticProps } from 'next';
import { FC, useContext } from 'react';
import { Minute, Second } from 'web-utility';

import { GitListLayout } from '../components/Git';
import { ScrollListPage } from '../components/Layout/ScrollListPage';
import repositoryStore, { GitRepositoryModel } from '../models/Repository';
import { I18nContext } from '../models/Translation';

export const getStaticProps: GetStaticProps<{ list: GitRepository[] }> = async () => {
  const list = await new GitRepositoryModel('idea2app').getList();

  return { props: JSON.parse(JSON.stringify({ list })), revalidate: Minute / Second };
};

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
