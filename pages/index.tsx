import Masonry from '@mui/lab/Masonry';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { PartnerOverview } from '../components/Client/Partner';
import { GitListLayout } from '../components/Git';
import { SymbolIcon } from '../components/Icon';
import { Section } from '../components/Layout/Section';
import { MemberCard } from '../components/Member/Card';
import { PageHead } from '../components/PageHead';
import { Member, MEMBER_VIEW, MemberModel } from '../models/Member';
import { GitRepositoryModel } from '../models/Repository';
import { i18n, t } from '../models/Translation';
import { solidCache } from './api/core';
import { PARTNERS_INFO, service } from './api/home';

interface HomePageProps {
  repositories: GitRepository[];
  members: Member[];
}

export const getServerSideProps = compose(solidCache, errorLogger, translator(i18n), async () => {
  const [repositories, members] = await Promise.all([
    new GitRepositoryModel('idea2app').getList({ relation: [] }, 1, 9),
    new MemberModel().getViewList(MEMBER_VIEW),
  ]);

  return {
    props: JSON.parse(
      JSON.stringify({
        repositories,
        members: members.filter(({ github, position, summary }) => github && position && summary),
      }),
    ),
  };
});

const HomePage: FC<HomePageProps> = observer(({ repositories, members }) => (
  <>
    <PageHead />

    <div className="px-4 py-6 pt-16">
      <section className="container mx-auto flex max-w-screen-lg flex-col gap-4">
        <div className="flex flex-row items-center justify-around py-12">
          <Image src="/idea2app.svg" width={234} height={220} alt="idea2app logo" />

          <header className="border-s-2 border-s-black p-4 dark:border-s-white">
            <p>{t('idea2app_summary')}</p>
            <p>{t('idea2app_slogan')}</p>

            <p className="my-4 text-neutral-500">{t('idea2app_slogan_2')}?</p>

            <a
              className="border-b-2 border-b-black py-1 dark:border-b-white"
              href="https://wenjuan.feishu.cn/m?t=sBih7Nzwkwqi-0l12"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contact_us')}
            </a>
          </header>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {service().map(({ title, summary, icon }) => (
            <li
              key={title}
              className="flex flex-col gap-4 rounded-3xl border p-4 elevation-1 hover:elevation-8 dark:border-0"
              tabIndex={-1}
            >
              <h5 className="flex items-center gap-4">
                <SymbolIcon name={icon} /> {title}
              </h5>

              <p>{summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="partner" className="relative mx-auto max-w-screen-xl px-8 py-16">
        <div className="absolute left-0 top-0 z-20 block h-24 w-24 bg-gradient-to-r from-background to-transparent" />
        <ul className="hover:animation-pause-all flex flex-row flex-nowrap items-center justify-center gap-12 overflow-hidden">
          {/**
           * @todo: polish the carousel animation
           */}
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

      <Section title={t('member')} link="/member">
        <div className="relative max-h-[45rem] overflow-hidden">
          <Masonry
            component="ul"
            className="overflow-hidden"
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            defaultHeight={720}
            defaultColumns={4}
            defaultSpacing={1}
          >
            {members.map(item => (
              <MemberCard key={String(item.id)} {...item} />
            ))}
          </Masonry>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background pb-8 pt-32" />
        </div>
      </Section>

      <Section title={t('open_source_project')} link="/open-source">
        <GitListLayout defaultData={repositories} />
      </Section>
    </div>
  </>
));

export default HomePage;
