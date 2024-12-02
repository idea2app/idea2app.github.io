import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { MemberListLayout } from '../../components/Member/List';
import { PageHead } from '../../components/PageHead';
import memberStore, { Member, MemberModel } from '../../models/Member';
import { i18n, t } from '../../models/Translation';
import { solidCache } from '../api/core';

export const getServerSideProps = compose(
  solidCache,
  errorLogger,
  translator(i18n),
  async () => {
    const list = await new MemberModel().getList();

    return { props: { list } };
  },
);

const MemberListPage: FC<{ list: Member[] }> = observer(({ list }) => (
  <Container>
    <PageHead title={t('member')} />

    <h1 className="my-4">{t('member')}</h1>

    <ScrollList
      translator={i18n}
      store={memberStore}
      renderList={allItems => <MemberListLayout defaultData={allItems} />}
      defaultData={list}
    />
  </Container>
));

export default MemberListPage;
