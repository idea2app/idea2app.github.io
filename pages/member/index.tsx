import { observer } from 'mobx-react';
import { compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { ScrollListPage } from '../../components/Layout/ScrollListPage';
import { MemberListLayout } from '../../components/Member/List';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { I18nContext } from '../../models/Translation';
import { solidCache } from '../api/core';

export const getServerSideProps = compose(solidCache, errorLogger, async () => {
  const list = await new MemberModel().getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
});

const MemberListPage: FC<{ list: Member[] }> = observer(({ list }) => {
  const { t } = useContext(I18nContext);

  return (
    <ScrollListPage
      title={t('member')}
      header={t('member')}
      store={memberStore}
      Layout={MemberListLayout}
      defaultData={list}
    />
  );
});
export default MemberListPage;
