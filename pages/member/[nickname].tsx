import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { compose, errorLogger } from 'next-ssr-middleware';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemberCard } from '../../components/Member/Card';
import { PageHead } from '../../components/PageHead';
import { ProjectListLayout } from '../../components/Project';
import { Member, MemberModel } from '../../models/Member';
import { Project, ProjectModel } from '../../models/Project';
import { i18n, I18nContext } from '../../models/Translation';
import { solidCache } from '../api/core';

interface MemberDetailPageProps {
  member: Member;
  leaderProjects: Project[];
  memberProjects: Project[];
}

export const getServerSideProps = compose<{ nickname: string }>(
  solidCache,
  errorLogger,
  async ({ params }) => {
    const [member] = await new MemberModel().getList(params, 1, 1);

    if (!member) return { notFound: true, props: {} };

    const [leaderProjects, memberProjects] = await Promise.all([
      new ProjectModel().getAll({ leader: params?.nickname }),
      new ProjectModel().getAll({ members: params?.nickname }),
    ]);

    return {
      props: JSON.parse(JSON.stringify({ member, leaderProjects, memberProjects })),
    };
  },
);

@observer
export default class MemberDetailPage extends ObservedComponent<
  MemberDetailPageProps,
  typeof i18n
> {
  static contextType = I18nContext;

  @observable accessor eventKey = '0';

  handleChange = (value: string) => (this.eventKey = value);

  render() {
    const { member, leaderProjects, memberProjects } = this.props;
    const { t } = this.observedContext!;

    const entries = Object.entries({
      [t('projects_as_leader')]: leaderProjects,
      [t('projects_as_member')]: memberProjects,
    });

    return (
      <div className="container mx-auto mt-16 max-w-screen-xl px-4 py-6">
        <PageHead title={member.nickname as string} />

        <div className="flex flex-col gap-4 md:flex-row">
          <ul className="w-full md:w-1/4">
            <MemberCard {...member} />
          </ul>

          <div className="flex w-full flex-col rounded-2xl md:w-3/4">
            <Tabs value={this.eventKey} onValueChange={this.handleChange} className="w-full">
              <TabsList className="mx-auto mb-4">
                {entries.map(([label, list], index) => (
                  <TabsTrigger key={label} value={index + ''} className="gap-2">
                    <span>{label}</span>
                    <Badge variant="secondary">{list.length}</Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
              {entries.map(([label, list], index) => (
                <TabsContent key={label} value={index + ''} className="px-0">
                  <ProjectListLayout defaultData={list} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
