import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { Frame } from '../../components/Layout/Frame';
import { MemberListLayout } from '../../components/Member/List';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { i18n } from '../../models/Translation';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  const list = await new MemberModel().getList();

  return { props: { list: JSON.parse(JSON.stringify(list)) as Member[] } };
});

const { t } = i18n;

const MemberListPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ list }) => (
    <Frame
      title={t('member')}
      header={t('member')}
      store={memberStore}
      Layout={MemberListLayout}
      defaultData={list}
    />
  )
);

export default MemberListPage;
