import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

import { MemberListLayout } from '../components/Member/List';
import { PageHead } from '../components/PageHead';
import memberStore, { MemberModel } from '../models/Member';
import { i18n } from '../models/Translation';
import { withErrorLog, withTranslation } from './api/core';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    const list = await new MemberModel().getList();

    return { props: { list } };
  }),
);

const { t } = i18n;

const MemberListPage: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = observer(({ list }) => (
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
