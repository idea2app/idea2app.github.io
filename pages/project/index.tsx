import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { Frame } from '../../components/Layout/Frame';
import { ProjectListLayout } from '../../components/Project';
import projectStore, { Project, ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';

const { t } = i18n;

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new ProjectModel().getList({});

  return { props: { list: JSON.parse(JSON.stringify(list)) as Project[] } };
});

const ProjectListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ list }) => (
    <Frame
      title={t('custom_software_development')}
      header={t('custom_software_development')}
      Layout={ProjectListLayout}
      store={projectStore}
      defaultData={list}
    />
  )
);

export default ProjectListPage;
