import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import { ScrollList } from '../../components/ScrollList';
import projectStore, { ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new ProjectModel().getList({});

  /**
   *  @todo fix no unsafe assignment
   */
  return { props: { list } };
});

const { t } = i18n;

const ProjectListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ list }) => (
    <div className="container mx-auto">
      <PageHead title={t('custom_software_development')} />

      <h1 className="my-4">{t('custom_software_development')}</h1>

      <ScrollList
        translator={i18n}
        store={projectStore}
        renderList={allItems => <ProjectListLayout defaultData={allItems} />}
        defaultData={list}
      />
    </div>
  )
);

export default ProjectListPage;
