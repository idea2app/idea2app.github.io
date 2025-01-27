import { observer } from 'mobx-react';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { ScrollListPage } from '../../components/Layout/ScrollListPage';
import { MemberListLayout } from '../../components/Member/List';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { i18n, t } from '../../models/Translation';
import { solidCache } from '../api/core';

export const getServerSideProps = compose(solidCache, errorLogger, translator(i18n), async () => {
  const list = await new MemberModel().getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const MemberListPage: FC<{ list: Member[] }> = observer(({ list }) => (
  <ScrollListPage
    title={t('member')}
    header={t('member')}
    store={memberStore}
    Layout={MemberListLayout}
    defaultData={list}
  />
));

export default MemberListPage;
