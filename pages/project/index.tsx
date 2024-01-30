import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import projectStore, { ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';

export const getServerSideProps = compose(
  cache(),
  errorLogger,
  translator(i18n),
  async () => {
    const list = await new ProjectModel().getList({});

    return { props: JSON.parse(JSON.stringify({ list })) };
  },
);

const { t } = i18n;

const ProjectListPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = observer(({ list }) => (
  <Container>
    <PageHead title={t('custom_software_development')} />

    <h1 className="my-4">{t('custom_software_development')}</h1>

    {projectStore.downloading > 0 && <Loading />}

    <ScrollList
      translator={i18n}
      store={projectStore}
      renderList={allItems => <ProjectListLayout defaultData={allItems} />}
      defaultData={list}
    />
  </Container>
));

export default ProjectListPage;
