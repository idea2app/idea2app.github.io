import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { GitCard } from '../../components/Git/Card';
import { PageHead } from '../../components/PageHead';
import { ProjectCard } from '../../components/Project/Card';
import { Project, ProjectModel } from '../../models/Project';
import { GitRepositoryModel } from '../../models/Repository';
import { i18n, t } from '../../models/Translation';
import { solidCache } from '../api/core';
import { fileURLOf } from '../api/Lark/file/[id]';

interface ProjectDetailPageProps {
  project: Project;
  repositories: GitRepository[];
}

export const getServerSideProps = compose<
  { id: string },
  ProjectDetailPageProps
>(
  solidCache,
  errorLogger,
  translator(i18n),
  async ({ params: { id } = {} }) => {
    let repositories: GitRepository[] = [];

    const project = await new ProjectModel().getOne(id!);

    if (project.openSource) {
      const openSource = (project.openSource + '')
        .split(/\s+/)
        .map(path => new URL(path).pathname.slice(1));

      repositories = await new GitRepositoryModel('idea2app').getGroup(
        openSource,
      );
    }
    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
        repositories,
      },
    };
  },
);

const ProjectDetailPage: FC<ProjectDetailPageProps> = observer(
  ({ project, repositories }) => (
    <Container>
      <PageHead title={project.name + ''} />

      <Row className="g-4 my-3">
        <Col
          xs={12}
          sm={8}
          as="a"
          className="text-decoration-none"
          href={project.link || '#'}
        >
          <Image fluid src={fileURLOf(project.image)} alt={project.name + ''} />
        </Col>
        <Col xs={12} sm={4}>
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
        </Col>
      </Row>
    </Container>
  ),
);
export default ProjectDetailPage;
