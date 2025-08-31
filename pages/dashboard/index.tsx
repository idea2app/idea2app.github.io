import { User } from '@idea2app/data-server';
import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { SessionBox } from '../../components/User/SessionBox';
import { I18nContext } from '../../models/Translation';

interface DashboardPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, DashboardPageProps>(jwtVerifier());

const DashboardPage: FC<DashboardPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter();
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const menu = [{ href: '/dashboard', title: t('overview') }];

  return (
    <SessionBox title={t('backend_management')} path={asPath} {...{ menu, jwtPayload }}>
      <Container maxWidth="lg" className="py-16 text-center">
        <Typography variant="h3" component="h1">
          {t('welcome_use')}
        </Typography>
      </Container>
    </SessionBox>
  );
});

export default DashboardPage;
