import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { GitListLayout } from '../components/Git';
import { PageHead } from '../components/PageHead';
import { ScrollList } from '../components/ScrollList';
import repositoryStore, { GitRepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new GitRepositoryModel('idea2app').getList();

  /**
   * @todo fix no unsafe assignment
   */
  return { props: { list } };
});

const { t } = i18n;

const GitListPage: FC<{ list: GitRepository[] }> = observer(({ list }) => (
  <div className="container mx-auto">
    <PageHead title={t('open_source_project')} />

    <h1 className="my-4">{t('open_source_project')}</h1>

    <ScrollList
      translator={i18n}
      store={repositoryStore}
      renderList={allItems => <GitListLayout defaultData={allItems} />}
      defaultData={list}
    />
  </div>
));

export default GitListPage;
