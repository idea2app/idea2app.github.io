import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { GetStaticProps } from 'next';
import { FC, useContext } from 'react';
import { Minute, Second } from 'web-utility';

import { GitCard } from '../../components/Git/Card';
import { LarkImage } from '../../components/LarkImage';
import { PageHead } from '../../components/PageHead';
import { ProjectCard } from '../../components/Project/PublicCard';
import { Project, ProjectModel } from '../../models/Project';
import { GitRepositoryModel } from '../../models/Repository';
import { I18nContext } from '../../models/Translation';
import { lark } from '../api/Lark/core';
import { skipBuildingAll } from '@/lib/SSG';

interface ProjectDetailPageProps {
  project: Project;
  repositories: GitRepository[];
}

export const getStaticPaths = skipBuildingAll;

export const getStaticProps: GetStaticProps<ProjectDetailPageProps, { id: string }> = async ({
  params: { id } = {},
}) => {
  await lark.getAccessToken();

  const store = new ProjectModel();
  store.client = lark.client;

  let repositories: GitRepository[] = [];

  const project = await store.getOne(id!);

  if (project.openSource) {
    const openSource = String(project.openSource)
      .split(/\s+/)
      .map(path => new URL(path).pathname.slice(1));

    repositories = await new GitRepositoryModel('idea2app').getGroup(openSource);
  }

  return {
    props: JSON.parse(JSON.stringify({ project, repositories })),
    revalidate: Minute / Second,
  };
};

const ProjectDetailPage: FC<ProjectDetailPageProps> = observer(({ project, repositories }) => {
  const { t } = useContext(I18nContext);

  return (
    <div className="container mx-auto mt-16 max-w-screen-xl px-4 py-6">
      <PageHead title={String(project.name)} />

      <div className="flex flex-col gap-4 md:flex-row">
        <a
          className="w-full md:w-2/3"
          href={String(project.link) || '#'}
          target="_blank"
          rel="noreferrer"
        >
          {/**
           * @todo replace with LarkImage after R2 is ready
           */}
          <LarkImage className="object-fill" src={project.image} alt={String(project.name)} />
        </a>

        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <ProjectCard {...project} component="div" />
          <hr />
          <h2 className="text-xl">{t('open_source_project')}</h2>

          <ul className="flex max-h-[45rem] snap-y flex-col gap-4 overflow-y-auto">
            {repositories.map(repository => (
              <GitCard key={repository.id} className="snap-center" {...repository} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ProjectDetailPage;
