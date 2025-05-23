import { TabContext, TabList, TabListProps, TabPanel } from '@mui/lab';
import { Badge, Tab } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent, observePropsState } from 'mobx-react-helper';
import { compose, errorLogger } from 'next-ssr-middleware';
import { Component } from 'react';

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

export default interface MemberDetailPage
  extends ObservedComponent<MemberDetailPageProps, typeof i18n> {}

@observer
@observePropsState
export default class MemberDetailPage extends Component<MemberDetailPageProps> {
  static contextType = I18nContext;

  @observable accessor eventKey = '0';

  handleChange: TabListProps['onChange'] = (event, newValue) => (this.eventKey = newValue);

  render() {
    const { member, leaderProjects, memberProjects } = this.props;
    const { t } = this.observedContext!;

    const entries = Object.entries({
      [t('projects_as_leader')]: leaderProjects,
      [t('projects_as_member')]: memberProjects,
    });

    return (
      <div className="container mx-auto mt-16 max-w-(--breakpoint-xl) px-4 py-6">
        <PageHead title={member.nickname as string} />

        <div className="flex flex-col gap-4 md:flex-row">
          <ul className="w-full md:w-1/3">
            <MemberCard {...member} />
          </ul>

          <div className="flex w-full flex-col items-center rounded-2xl border-2 md:w-2/3">
            <TabContext value={this.eventKey}>
              <TabList
                component="ul"
                aria-label="project tab"
                variant="fullWidth"
                onChange={this.handleChange}
              >
                {entries.map(([label, list], index) => (
                  <Tab
                    key={label}
                    component="li"
                    label={
                      <Badge
                        className="px-2"
                        badgeContent={list.length}
                        color="primary"
                        aria-label={`${list.length} ${label}`}
                      >
                        {label}
                      </Badge>
                    }
                    value={index + ''}
                  />
                ))}
              </TabList>
              {entries.map(([label, list], index) => (
                <TabPanel key={label} value={index + ''}>
                  <ProjectListLayout defaultData={list} />
                </TabPanel>
              ))}
            </TabContext>
          </div>
        </div>
      </div>
    );
  }
}
