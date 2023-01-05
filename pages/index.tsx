import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import { GitListLayout } from '../components/Git';
import { PageHead } from '../components/PageHead';
import { ProjectListLayout } from '../components/Project';
import { ProjectModel } from '../models/Project';
import { RepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { withErrorLog, withTranslation } from './api/core';
import { service } from './api/home';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    const [projects, repositories] = await Promise.all([
      new ProjectModel().getList({}, 1, 9),
      new RepositoryModel().getList({}, 1),
    ]);

    return {
      props: { projects, repositories },
    };
  }),
);

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ projects, repositories }) => (
    <>
      <PageHead />

      <Container as="main" className={styles.main}>
        <h1 className={`mb-5 text-center ${styles.title}`}>
          <span className="visually-hidden">idea2app</span>
          <Image src="https://github.com/idea2app.png" />
        </h1>
        <p className={`text-center fs-4 ${styles.description}`}>
          {t('idea2app_summary')}
        </p>
        <p className={`text-center fs-4 ${styles.description}`}>
          {t('idea2app_slogan')}
        </p>

        <Row className="mt-5 g-4" xs={1} sm={2} md={3}>
          {service().map(({ title, summary }) => (
            <Col key={title}>
              <Card
                className={`h-100 p-4 rounded-3 border ${styles.card}`}
                tabIndex={-1}
              >
                <Card.Body>
                  <Card.Title as="h2" className="fs-4 mb-3">
                    {title}
                  </Card.Title>
                  <Card.Text className="fs-5">{summary}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <section>
          <h2 className="my-5 text-center">{t('latest_projects')}</h2>

          <ProjectListLayout defaultData={projects} />

          <footer className="text-center mt-5">
            <Button variant="outline-primary" size="sm" href="/project">
              {t('load_more')}
            </Button>
          </footer>
        </section>

        <section>
          <h2 className="my-5 text-center">{t('open_source_project')}</h2>

          <GitListLayout defaultData={repositories} />

          <footer className="text-center mt-5">
            <Button variant="outline-primary" size="sm" href="/open-source">
              {t('load_more')}
            </Button>
          </footer>
        </section>
      </Container>
    </>
  ));

export default HomePage;
