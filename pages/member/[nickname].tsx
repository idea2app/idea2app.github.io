import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { MemberCard } from '../../components/Member/Card';
import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import { Member, MemberModel } from '../../models/Member';
import { Project, ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';

const { t } = i18n;

interface MemberDetailPageProps {
  member: Member;
  leaderProjects: Project[];
  memberProjects: Project[];
}

export const getServerSideProps = compose<{ nickname: string }>(
  cache(),
  errorLogger,
  translator(i18n),
  async ({ params }) => {
    const [member] = await new MemberModel().getList(params, 1, 1);

    if (!member) return { notFound: true, props: {} };

    const [leaderProjects, memberProjects] = await Promise.all([
      new ProjectModel().getAll({ leader: params?.nickname }),
      new ProjectModel().getAll({ members: params?.nickname })
    ]);

    return {
      props: { member, leaderProjects, memberProjects }
    };
  }
);

const MemberDetailPage: FC<MemberDetailPageProps> = observer(
  ({ member, leaderProjects, memberProjects }) => (
    <div className="container">
      <PageHead title={member.nickname as string} />

      <Row>
        <Col xs={12} md={4}>
          <MemberCard className="sticky-top" style={{ top: '6.5rem' }} {...member} />
        </Col>
        <Col xs={12} md={8}>
          <Tabs variant="pills" justify className="mt-md-0 mt-4">
            {Object.entries({
              [t('projects_as_leader')]: leaderProjects,
              [t('projects_as_member')]: memberProjects
            }).map(([label, list]) => (
              <Tab
                key={label}
                eventKey={label}
                title={
                  <Stack direction="horizontal" gap={2} className="justify-content-center">
                    {label}
                    <Badge pill bg="light" text="dark" className="align-middle">
                      {list.length}
                    </Badge>
                  </Stack>
                }
              >
                <ProjectListLayout className="g-4 mt-1" defaultData={list} />
              </Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
);

export default MemberDetailPage;
