import { User, UserRole } from '@idea2app/data-server';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { FC, FormEvent, useContext } from 'react';
import { formToJSON } from 'web-utility';

import { ProjectCard } from '../../components/Project/NewCard';
import { ScrollList } from '../../components/ScrollList';
import { SessionBox } from '../../components/User/SessionBox';
import { ProjectModel } from '../../models/ProjectEvaluation';
import { I18nContext } from '../../models/Translation';

type DashboardPageProps = RouteProps & JWTProps<User>;

export const getServerSideProps = compose<{}, DashboardPageProps>(router, jwtVerifier());

// Initialize project store for client-side rendering
const projectStore = new ProjectModel();

const DashboardPage: FC<DashboardPageProps> = observer(({ route, jwtPayload }) => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const menu = [{ href: '/dashboard', title: t('overview') }];

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { name } = formToJSON<{ name: string }>(event.currentTarget);

    const { id } = await projectStore.updateOne({ name });

    if (id) location.href = `/dashboard/project/${id}`;
  };

  return (
    <SessionBox title={t('backend_management')} path={route.resolvedUrl} {...{ menu, jwtPayload }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 8 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          {t('welcome_use')}
        </Typography>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'center' },
            mt: 2,
            mb: 4,
          }}
          onSubmit={handleCreateProject}
        >
          <TextField
            label={t('new_project')}
            placeholder={t('create_new_project')}
            fullWidth
            name="name"
            required
            defaultValue={route.query.name}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={projectStore.uploading > 0}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: { xs: '100%', sm: 'auto' },
            }}
          >
            {t('create_new_project')}
          </Button>
        </Box>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mt: 4,
            mb: 3,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          {t('recent_projects')}
        </Typography>

        <ScrollList
          translator={i18n}
          store={projectStore}
          filter={
            jwtPayload?.roles.includes(2 as UserRole.Client) ? { createdBy: jwtPayload.id } : {}
          }
          renderList={allItems => (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {allItems[0] ? (
                allItems.map(project => (
                  <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
