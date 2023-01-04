import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { GitList } from '../components/Git';
import { PageHead } from '../components/PageHead';
import repositoryStore from '../models/Repository';
import { i18n } from '../models/Translation';
import { withTranslation } from './api/core';

export const getServerSideProps = withTranslation(async () => {
  const list = await repositoryStore.getList({}, 1);

  return { props: { list } };
});

const { t } = i18n;

const GitListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ list }) => (
    <Container>
      <PageHead title={t('open_source_project')} />

      <h1 className="my-4">{t('open_source_project')}</h1>

      {repositoryStore.downloading > 0 && <Loading />}

      <GitList store={repositoryStore} defaultData={list} />
    </Container>
  ));

export default GitListPage;
