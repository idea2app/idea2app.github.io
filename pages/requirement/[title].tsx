import Giscus from '@giscus/react';
import { Alert } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { compose, RouteProps, router, translator } from 'next-ssr-middleware';

import { PageHead } from '../../components/PageHead';
import { i18n, t } from '../../models/Translation';

export const getServerSideProps = compose(router, translator(i18n));

const RequirementDetailPage: NextPage<RouteProps<{ title: string }>> = observer(
  ({ route: { params } }) => {
    const { currentLanguage } = i18n,
      title = `${params!.title} - ${t('AI_requirement_evaluation')}`;

    return (
      <div className="container mx-auto flex max-w-(--breakpoint-xl) flex-col gap-4 px-4 pt-16 pb-6">
        <PageHead title={title}>
          <meta property="og:title" content={params!.title} />
        </PageHead>

        <h1 className="py-10 text-center text-5xl">{title}</h1>

        <Alert severity="warning">
          <span dangerouslySetInnerHTML={{ __html: t('information_security_alert') }} />
        </Alert>

        <Giscus
          repo="idea2app/.github"
          repoId="R_kgDOOHPqjQ"
          category="Ideas"
          categoryId="DIC_kwDOOHPqjc4Cn5sg"
          mapping="og:title"
          emitMetadata="1"
          lang={currentLanguage.startsWith('zh-') ? currentLanguage : currentLanguage.split('-')[0]}
        />
      </div>
    );
  },
);

export default RequirementDetailPage;
