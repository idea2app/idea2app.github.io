import { User, UserRole } from '@idea2app/data-server';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { compose, JWTProps, jwtVerifier } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { formToJSON } from 'web-utility';

import { ProjectCard } from '../../components/Project/NewCard';
import { ScrollList } from '../../components/ScrollList';
import { SessionBox } from '../../components/User/SessionBox';
import { ProjectModel } from '../../models/ProjectEvaluation';
import { I18nContext } from '../../models/Translation';

type DashboardPageProps = JWTProps<User>;

export const getServerSideProps = compose<{}, DashboardPageProps>(jwtVerifier());

// Initialize project store for client-side rendering
const projectStore = new ProjectModel();

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

        {/* New Project Section */}
        <form
          style={{ marginTop: 32, marginBottom: 32 }}
          onSubmit={event => {
            event.preventDefault();

            const { title } = formToJSON<{ title: string }>(event.currentTarget);

            location.href = `/dashboard/project/new?title=${encodeURIComponent(title)}`;
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            {t('create_new_project')}
          </Typography>
          
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField 
                fullWidth
                label={t('project_name')} 
                name="title" 
                required 
                defaultValue="动物保护平台" 
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Button variant="contained" size="large" type="submit" fullWidth>
                {t('create')}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 3 }}>
          {t('recent_projects')}
        </Typography>

        <ScrollList
          translator={i18n}
          store={projectStore}
          filter={
            jwtPayload?.roles.includes(2 as UserRole.Client) ? { createdBy: jwtPayload.id } : {}
          }
          renderList={allItems => (
            <Grid container spacing={3}>
              {allItems[0] ? (
                allItems.map(project => (
                  <Grid key={project.id} size={{ xs: 12, md: 4 }}>
                    <ProjectCard {...project} />
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
                    {t('no_project_data')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        />
      </Container>
    </SessionBox>
  );
});

export default DashboardPage;
