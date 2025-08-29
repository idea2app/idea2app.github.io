import { Container, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { PageHead } from '../../components/PageHead';

const DashboardPage: FC = observer(() => {
  return (
    <>
      <PageHead title="后台管理 - Dashboard" />
      
      <Container maxWidth="lg" className="text-center py-16">
        <Typography variant="h3" component="h1">
          欢迎使用
        </Typography>
      </Container>
    </>
  );
});

export default DashboardPage;