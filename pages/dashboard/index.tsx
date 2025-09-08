import { Project, User } from '@idea2app/data-server';
import { Container, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext, useMemo } from 'react';

import { ProjectCard } from '../../components/Project/NewCard';
import { ScrollList } from '../../components/ScrollList';
import { SessionBox } from '../../components/User/SessionBox';
import { ProjectModel } from '../../models/ProjectEvaluation';
import { I18nContext } from '../../models/Translation';

interface DashboardPageProps extends JWTProps<User> {}

export const getServerSideProps = compose<{}, DashboardPageProps>(jwtVerifier());

// Initialize project store for client-side rendering
const projectStore = new ProjectModel();

const DashboardPage: FC<DashboardPageProps> = observer(({ jwtPayload }) => {
  const { asPath } = useRouter();
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const menu = [{ href: '/dashboard', title: t('overview') }];

  // Role-based filtering: pass createdBy for client users, empty for others
  const filter = useMemo(() => {
    const userRole = jwtPayload?.role;
    if (userRole === 'client' && jwtPayload?.id) {
      return { createdBy: jwtPayload.id };
    }
    return {};
  }, [jwtPayload]);

  return (
    <SessionBox title={t('backend_management')} path={asPath} {...{ menu, jwtPayload }}>
      <Container maxWidth="lg" className="py-8">
        <Typography variant="h3" component="h1" gutterBottom>
          {t('welcome_use')}
        </Typography>
        
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 3 }}>
          最近项目
        </Typography>

        <ScrollList
          translator={i18n}
          store={projectStore}
          filter={filter}
          renderList={(allItems: Project[]) => (
            <Grid container spacing={3}>
              {allItems.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                  <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
                    暂无项目数据
                  </Typography>
                </Grid>
              ) : (
                allItems.map((project) => (
                  <Grid key={project.id} size={{ xs: 12, md: 4 }}>
                    <ProjectCard {...project} />
                  </Grid>
                ))
              )}
            </Grid>
          )}
        />
      </Container>
    </SessionBox>
  );
});

export default DashboardPage;
