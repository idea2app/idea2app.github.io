import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { PageHead } from '../../components/PageHead';
import { ProjectList } from '../../components/Project';
import projectStore, { ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';
import { withErrorLog, withTranslation } from '../api/core';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    const list = await new ProjectModel().getList({});

    return { props: { list } };
  }),
);

const { t } = i18n;

const ProjectListPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = observer(({ list }) => (
  <Container>
    <PageHead title={t('custom_software_development')} />

    <h1 className="my-4">{t('custom_software_development')}</h1>

    {projectStore.downloading > 0 && <Loading />}

    <ProjectList store={projectStore} defaultData={list} />
  </Container>
));

export default ProjectListPage;
