import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { MemberListLayout } from '../../components/Member/List';
import { PageHead } from '../../components/PageHead';
import { ScrollList } from '../../components/ScrollList';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { i18n } from '../../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new MemberModel().getList();

  return { props: { list: JSON.parse(JSON.stringify({ list })) as Member[] } };
});

const { t } = i18n;

const MemberListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ list }) => (
    <div className="container mx-auto max-w-screen-xl">
      <PageHead title={t('member')} />

      <h1 className="my-8">{t('member')}</h1>

      <ScrollList
        translator={i18n}
        store={memberStore}
        renderList={allItems => <MemberListLayout defaultData={allItems} />}
        defaultData={list}
      />
    </div>
  )
);

export default MemberListPage;
