import { observer } from 'mobx-react';
import { GetStaticProps } from 'next';
import { FC, useContext } from 'react';

import { ScrollListPage } from '../../components/Layout/ScrollListPage';
import { MemberListLayout } from '../../components/Member/List';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { I18nContext } from '../../models/Translation';
import { lark } from '../api/Lark/core';

export const getStaticProps: GetStaticProps<{ list: Member[] }> = async () => {
  await lark.getAccessToken();

  const store = new MemberModel();
  store.client = lark.client;

  const list = await store.getList();

  return { props: JSON.parse(JSON.stringify({ list })) };
};

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
