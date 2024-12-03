import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { GitListLayout } from '../components/Git';
import { Frame } from '../components/Layout/Frame';
import repositoryStore, { GitRepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new GitRepositoryModel('idea2app').getList();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { props: JSON.parse(JSON.stringify({ list })) };
});
const { t } = i18n;

const GitListPage: FC<{ list: GitRepository[] }> = observer(({ list }) => (
  <Frame
    title={t('open_source_project')}
    header={t('open_source_project')}
    store={repositoryStore}
    Layout={GitListLayout}
    defaultData={list}
  />
));

export default GitListPage;
