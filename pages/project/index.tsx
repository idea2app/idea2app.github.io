import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import projectStore, { Project, ProjectModel } from '../../models/Project';
import { i18n, t } from '../../models/Translation';
import { solidCache } from '../api/core';

export const getServerSideProps = compose(
  solidCache,
  errorLogger,
  translator(i18n),
  async () => {
    const list = await new ProjectModel().getList();

    return { props: JSON.parse(JSON.stringify({ list })) };
  },
);

const ProjectListPage: FC<{ list: Project[] }> = observer(({ list }) => (
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
