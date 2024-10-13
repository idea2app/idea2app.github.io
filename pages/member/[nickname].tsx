import { observer } from 'mobx-react';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { MemberCard } from '../../components/Member/Card';
import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import { Member, MemberModel } from '../../models/Member';
import { Project, ProjectModel } from '../../models/Project';
import { i18n } from '../../models/Translation';
import { Chip, Tab, Tabs } from '@mui/material';

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
    <div className="mx-auto">
      <PageHead title={member.nickname as string} />

      <div className="grid">
        <div className="">
          <MemberCard className="sticky-top" style={{ top: '6.5rem' }} {...member} />
        </div>
        <div className="">
          <Tabs className="">
            {Object.entries({
              [t('projects_as_leader')]: leaderProjects,
              [t('projects_as_member')]: memberProjects
            }).map(([label, list]) => (
              <Tab
                key={label}
                label={
                  <div className="justify-content-center flex flex-col gap-3">
                    {label}
                    <Chip label={list.length} />
                  </div>
                }
              />
            ))}
          </Tabs>
          <div role='tabpanel'></div>
        </div>
      </div>
    </div>
  )
);

export default MemberDetailPage;
