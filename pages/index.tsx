import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid2
} from '@mui/material';
import { GitRepository } from 'mobx-github';
import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger, translator } from 'next-ssr-middleware';
import { FC } from 'react';

import { PageHead } from '../components/PageHead';
import { ClientModel } from '../models/Client';
import { MEMBER_VIEW, MemberModel } from '../models/Member';
import { Project, ProjectModel } from '../models/Project';
import { GitRepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';
import { getTarget } from './api/core';
import { service } from './api/home';

export const getServerSideProps = compose(cache(), errorLogger, translator(i18n), async () => {
  // const [
  // projects,
  // repositories
  // partners, members
  // ] = await Promise.all([
  // new ProjectModel().getList({}, 1, 9),
  // new GitRepositoryModel('idea2app').getList()
  // new ClientModel().getList({ partnership: '战略合作' }),
  // new MemberModel().getViewList(MEMBER_VIEW)
  // ]);

  return {
    props: {
      // projects: JSON.parse(JSON.stringify(projects)) as Project[],
      // repositories: JSON.parse(JSON.stringify(repositories)) as GitRepository[]
      // partners,
      // members: members.filter(({ github, position, summary }) => github && position && summary)
    }
  };
});

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = observer(
  ({ projects, repositories, partners, members }) => (
    <>
      <PageHead />

      <Container>
        <h1 className="mb-5 text-center">
          <CardMedia image="/idea2app.svg" component="img" alt="idea2app logo" />
        </h1>
        <p className="fs-4 text-center">{t('idea2app_summary')}</p>
        <p className="fs-4 text-center">{t('idea2app_slogan')}</p>

        <Grid2 className="g-4 mt-5">
          {service().map(({ title, summary, buttonText, buttonLink }) => (
            <Grid2 key={title}>
              <Card className="h-100 rounded-3 border p-4" tabIndex={-1}>
                <CardHeader component="h2" title={title} />

                <CardContent>{summary}</CardContent>
                <CardActions>
                  {buttonText && buttonLink && (
                    <Button href={buttonLink} target={getTarget(buttonLink)}>
                      {buttonText}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {/* <Section title={t('latest_projects')} link="/project">
          <ProjectListLayout defaultData={projects} />
        </Section>

        <Section title={t('open_source_project')} link="/open-source">
          <GitListLayout defaultData={repositories} />
        </Section>

        <Section title={t('member')} link="/member">
          <MemberListLayout defaultData={members} />
        </Section> */}

        {/* <Section title={t('partner')} id="partner">
          <Grid2 component="ul" className="list-unstyled g-4">
            {partners.map(item => (
              <Grid2 key={String(item.id)} component="li">
                <Partner className="h-100" {...item} />
              </Grid2>
            ))}
          </Grid2>
        </Section> */}
      </Container>
    </>
  )
);

export default HomePage;
