import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';

import { GitCard } from '../../components/Git/Card';
import { LarkImage } from '../../components/LarkImage';
import { PageHead } from '../../components/PageHead';
import { ProjectCard } from '../../components/Project/Card';
import { Project, ProjectModel } from '../../models/Project';
import { GitRepositoryModel } from '../../models/Repository';
import { i18n, t } from '../../models/Translation';

export const getServerSideProps = compose<
  { id: string },
  { project: Project; repositories: GitRepository[] }
>(cache(), errorLogger, translator(i18n), async ({ params: { id } = {} }) => {
  let repositories: GitRepository[] = [];

  const project = await new ProjectModel().getOne(id!);

  if (project.openSource) {
    const openSource = String(project.openSource)
      .split(/\s+/)
      .map(path => new URL(path).pathname.slice(1));

    repositories = await new GitRepositoryModel('idea2app').getGroup(openSource);
  }
  return {
    props: {
      project: JSON.parse(JSON.stringify(project)) as Project,
      repositories: JSON.parse(JSON.stringify(repositories))
    }
  };
});

const ProjectDetailPage = observer(
  ({ project, repositories }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <div className="container mx-auto mt-16 max-w-screen-xl px-4 py-6">
      <PageHead title={String(project.name)} />

      <div className="flex flex-col md:flex-row">
        <a className="w-full md:w-2/3" href={String(project.link) || '#'}>
          {/**
           * @todo replace with LarkImage after R2 is ready
           */}
          <LarkImage className="object-fill" src={project.image} alt={String(project.name)} />
        </a>

        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <ProjectCard {...project} />
          <hr />
          <h2 className="text-xl">{t('open_source_project')}</h2>

          <ul>
            {repositories.map(repository => (
              <GitCard key={repository.id} {...repository} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
);
export default ProjectDetailPage;
