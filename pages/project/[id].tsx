import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';

import { GitCard } from '../../components/Git/Card';
import { PageHead } from '../../components/PageHead';
import { ProjectCard } from '../../components/Project/Card';
import { Project, ProjectModel } from '../../models/Project';
import { GitRepositoryModel } from '../../models/Repository';
import { i18n } from '../../models/Translation';
import { fileURLOf } from '../api/Lark/file/[id]';

const { t } = i18n;

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
      repositories
    }
  };
});

const ProjectDetailPage = observer(
  ({ project, repositories }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
    <div className="mx-auto">
      <PageHead title={String(project.name)} />

      <div className="grid">
        <a className="text-decoration-none" href={String(project.link) || '#'}>
          <img className="object-fill" src={fileURLOf(project.image)} alt={String(project.name)} />
        </a>

        <div>
          <ProjectCard {...project} />
          <hr />
          <h2 className="fs-5 my-3">{t('open_source_project')}</h2>

          <ul className="list-unstyled">
            {repositories.map(repository => (
              <li key={repository.id} className="mb-3">
                <GitCard {...repository} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
);
export default ProjectDetailPage;
