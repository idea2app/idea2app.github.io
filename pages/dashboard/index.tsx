import { User, UserRole } from '@idea2app/data-server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { observer } from 'mobx-react';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { FC, FormEvent, useContext } from 'react';
import { formToJSON } from 'web-utility';

import { PageHead } from '../../components/PageHead';
import { ProjectCard } from '../../components/Project/NewCard';
import { ScrollList } from '@/components/ui/mobx-restful-shadcn/scroll-list';
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

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { name } = formToJSON<{ name: string }>(event.currentTarget);

    const { id } = await projectStore.updateOne({ name });

    if (id) location.href = `/dashboard/project/${id}`;
  };

  return (
    <SessionBox path={route.resolvedUrl} {...{ jwtPayload }}>
      <PageHead title={t('backend_management')} />

      <div className="mx-auto max-w-screen-lg px-4 py-6 pt-16">
        <h1 className="mb-2 text-[1.75rem] font-semibold sm:text-[2.5rem] md:text-[3rem]">
          {t('welcome_use')}
        </h1>

        <form
          className="mt-2 mb-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
          onSubmit={handleCreateProject}
        >
          <label className="flex-1 text-sm">
            <span className="mb-1 block">{t('new_project')}</span>
            <Input
              placeholder={t('create_new_project')}
              name="name"
              required
              defaultValue={route.query.name}
            />
          </label>
          <Button
            className="min-w-full whitespace-nowrap sm:min-w-0"
            type="submit"
            disabled={projectStore.uploading > 0}
          >
            {t('create_new_project')}
          </Button>
        </form>

        <h2 className="mt-4 mb-3 text-[1.25rem] font-semibold sm:text-[1.5rem]">
          {t('recent_projects')}
        </h2>

        <ScrollList
          translator={i18n}
          store={projectStore}
          filter={
            jwtPayload?.roles.includes(2 as UserRole.Client) ? { createdBy: jwtPayload.id } : {}
          }
          renderList={allItems => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allItems[0] ? (
                allItems.map(project => (
                  <div key={project.id}>
                    <ProjectCard {...project} />
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <p className="text-muted-foreground mt-4 text-center">{t('no_project_data')}</p>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </SessionBox>
  );
});

export default DashboardPage;
