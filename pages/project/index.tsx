import { observer } from 'mobx-react';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { ScrollListPage } from '../../components/Layout/ScrollListPage';
import { ProjectListLayout } from '../../components/Project';
import projectStore, { Project, ProjectModel } from '../../models/Project';
import { i18n, t } from '../../models/Translation';
import { solidCache } from '../api/core';

export const getServerSideProps = compose(solidCache, errorLogger, translator(i18n), async () => {
  const list = await new ProjectModel().getList({});

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const ProjectListPage: FC<{ list: Project[] }> = observer(({ list }) => (
  <ScrollListPage
    title={t('custom_software_development')}
    header={t('custom_software_development')}
    Layout={ProjectListLayout}
    store={projectStore}
    defaultData={list}
  />
));

export default ProjectListPage;
