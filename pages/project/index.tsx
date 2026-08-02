import { observer } from 'mobx-react';
import { GetStaticProps } from 'next';
import { FC, useContext } from 'react';

import { ScrollListPage } from '../../components/Layout/ScrollListPage';
import { ProjectListLayout } from '../../components/Project';
import projectStore, { Project, ProjectModel } from '../../models/Project';
import { I18nContext } from '../../models/Translation';
import { lark } from '../api/Lark/core';

export const getStaticProps: GetStaticProps<{ list: Project[] }> = async () => {
  await lark.getAccessToken();

  const store = new ProjectModel();
  store.client = lark.client;

  const list = await store.getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
};

const ProjectListPage: FC<{ list: Project[] }> = observer(({ list }) => {
  const { t } = useContext(I18nContext);

  return (
    <ScrollListPage
      title={t('custom_software_development')}
      header={t('custom_software_development')}
      Layout={ProjectListLayout}
      store={projectStore}
      defaultData={list}
    />
  );
});
export default ProjectListPage;
