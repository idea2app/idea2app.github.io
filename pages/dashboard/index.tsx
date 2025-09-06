import { User } from '@idea2app/data-server';
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';

import { SessionBox } from '../../components/User/SessionBox';
import { I18nContext } from '../../models/Translation';

interface DashboardPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, DashboardPageProps>(jwtVerifier());

// Mock projects that would be created from dashboard
const mockProjects = [
  {
    id: 'animal-protection-platform',
    name: '动物保护平台',
    description: '一个用于保护野生动物和宠物的综合平台',
    status: '评估中',
  },
  {
    id: 'e-commerce-system',
    name: '电商系统',
    description: '现代化的电子商务解决方案',
    status: '评估完成',
  },
  {
    id: 'iot-monitoring',
    name: 'IoT监控系统',
    description: '物联网设备监控和管理平台',
    status: '待评估',
  },
];

const DashboardPage: FC<DashboardPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter();
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const menu = [{ href: '/dashboard', title: t('overview') }];

  return (
    <SessionBox title={t('backend_management')} path={asPath} {...{ menu, jwtPayload }}>
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h3" component="h1" gutterBottom>
          {t('welcome_use')}
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 3 }}>
          最近项目
        </Typography>

        <Grid container spacing={3}>
          {mockProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Typography variant="caption" 
                    sx={{ 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1, 
                      bgcolor: project.status === '评估完成' ? 'success.light' : 
                              project.status === '评估中' ? 'warning.light' : 'grey.200',
                      color: project.status === '评估完成' ? 'success.contrastText' : 
                             project.status === '评估中' ? 'warning.contrastText' : 'text.primary'
                    }}
                  >
                    {project.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    href={`/dashboard/project/${project.id}`}
                    size="small"
                    variant="contained"
                  >
                    查看评估
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SessionBox>
  );
});

export default DashboardPage;
