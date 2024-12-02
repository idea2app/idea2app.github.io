import { Loading } from 'idea-react';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { GitListLayout } from '../components/Git';
import { PageHead } from '../components/PageHead';
import repositoryStore, { GitRepositoryModel } from '../models/Repository';
import { i18n, t } from '../models/Translation';

export const getServerSideProps = compose(
  cache(),
  errorLogger,
  translator(i18n),
  async () => {
    const list = await new GitRepositoryModel('idea2app').getList();

    return { props: JSON.parse(JSON.stringify({ list })) };
  },
);

const GitListPage: FC<{ list: GitRepository[] }> = observer(({ list }) => (
  <Container>
    <PageHead title={t('open_source_project')} />

    <h1 className="my-4">{t('open_source_project')}</h1>

    {repositoryStore.downloading > 0 && <Loading />}

    <ScrollList
      translator={i18n}
      store={repositoryStore}
      renderList={allItems => <GitListLayout defaultData={allItems} />}
      defaultData={list}
    />
  </Container>
));

export default GitListPage;
