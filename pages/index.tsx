import { Button, Card, CardContent, CardHeader, Link, Tooltip } from '@mui/material';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import Masonry from '@mui/lab/Masonry';

import { Icon } from '../components/Icon';
import { PageHead } from '../components/PageHead';
import { i18n } from '../models/Translation';
import { PARTNERS_INFO, service } from './api/home';
import { ClientModel } from '../models/Client';
import { Partner, PartnerOverview } from '../components/Client/Partner';
import Image from 'next/image';
import { MemberListLayout } from '../components/Member/List';
import { MEMBER_VIEW, MemberModel } from '../models/Member';
import { Section } from '../components/Section';
import { MemberCard } from '../components/Member/Card';
import { GitListLayout } from '../components/Git';
import { GitRepositoryModel } from '../models/Repository';
import { GitRepository } from 'mobx-github';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const [
    // projects,
    repositories,
    // partners
    members
  ] = await Promise.all([
    // new ProjectModel().getList({}, 1, 9),
    new GitRepositoryModel('idea2app').getList({}, 1, 9),
    new MemberModel().getViewList(MEMBER_VIEW)
  ]);

  return {
    props: {
      // projects: JSON.parse(JSON.stringify(projects)) as Project[],
      repositories: JSON.parse(JSON.stringify(repositories)) as GitRepository[],

      members: members.filter(({ github, position, summary }) => github && position && summary)
    }
  };
});

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ projects, repositories, members }) => (
    <>
      <PageHead />

      <div className="px-2 py-6">
        <section className="container mx-auto flex max-w-screen-lg flex-col gap-4">
          <div className="flex flex-row items-center justify-around py-12">
            <Image src="/idea2app.svg" width={234} height={220} alt="idea2app logo" />

            <header className="border-l-2 border-l-black p-4 dark:border-l-white">
              <p>{t('idea2app_summary')}</p>
              <p>{t('idea2app_slogan')}</p>

              <p className="my-4 text-gray-500">{t('idea2app_slogan_2')}?</p>

              <a
                className="border-b-2 border-b-black py-1 dark:border-b-white"
                href="https://wenjuan.feishu.cn/m?t=sBih7Nzwkwqi-0l12"
                target="_blank"
                rel="noopener"
              >
                {t('contact_us')}
              </a>
            </header>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {service().map(({ title, summary, icon }) => (
              <li
                className="flex flex-col gap-4 rounded-3xl p-4 elevation-1 hover:elevation-8"
                tabIndex={-1}
                key={title}
              >
                <h5 className="flex items-center gap-4">
                  <Icon name={icon} /> {title}
                </h5>

                <p>{summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="partner" className="relative mx-auto max-w-screen-xl px-8 py-16">
          <div className="absolute left-0 top-0 z-20 block h-24 w-24 bg-gradient-to-r from-background to-transparent" />
          <ul className="flex flex-row flex-nowrap items-center justify-center gap-12 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <li
                key={index}
                className="flex min-w-full flex-shrink-0 animate-carousel flex-row flex-nowrap items-center justify-around gap-12"
              >
                {PARTNERS_INFO().map(({ name, ...rest }) => (
                  <PartnerOverview key={name} name={name} {...rest} />
                ))}
              </li>
            ))}
          </ul>
          <div className="absolute right-0 top-0 z-20 block h-24 w-24 bg-gradient-to-l from-background to-transparent" />
        </section>

        {/* <Section title={t('latest_projects')} link="/project">
          <ProjectListLayout defaultData={projects} />
        </Section>*/}

        <Section title={t('member')} link="/member">
          <div className="relative max-h-[45rem] overflow-hidden">
            <Masonry
              className="overflow-hidden"
              columns={{ xs: 2, md: 3 }}
              spacing={2}
              defaultHeight={720}
              defaultColumns={4}
              defaultSpacing={1}
            >
              {members.map(item => (
                <MemberCard key={String(item.id)} {...item} />
              ))}
            </Masonry>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background pb-8 pt-32"></div>
          </div>
        </Section>

        <Section title={t('open_source_project')} link="/open-source">
          <GitListLayout defaultData={repositories} />
        </Section>
      </div>
    </>
  )
);

export default HomePage;
