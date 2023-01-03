import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { PageHead } from '../components/PageHead';
import projectStore from '../models/Project';
import { i18n } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { withErrorLog, withTranslation } from './api/core';
import { mainNav } from './api/home';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    projectStore.clear();

    const projects = await projectStore.getList({}, 1, 9);

    return {
      props: { projects },
    };
  }),
);

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ projects }) => (
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

        <Row className="mt-5 g-4" xs={1} sm={2} md={4}>
          {mainNav().map(({ link, title, summary }) => (
            <Col key={link}>
              <Card
                className={`h-100 p-4 rounded-3 border ${styles.card}`}
                tabIndex={-1}
              >
                <Card.Body>
                  <Card.Title as="h2" className="fs-4 mb-3">
                    <a href={link} className="stretched-link">
                      {title} &rarr;
                    </a>
                  </Card.Title>
                  <Card.Text className="fs-5">{summary}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="my-5 text-center">{t('latest_projects')}</h2>

        <Row className="g-4" xs={1} sm={2} md={3}>
          {projects.map(({ id, name, price, settlementDate }) => (
            <Col key={id + ''}>
              <Card
                className={`h-100 rounded-3 border ${styles.card}`}
                tabIndex={-1}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h3" className="flex-fill fs-5 mb-3">
                    <a className="stretched-link">{name}</a>
                  </Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex">
                  <strong className="flex-fill">￥{price}</strong>
                  <time>🏁 {formatDate(+settlementDate!, 'YYYY-MM-DD')}</time>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  ));

export default HomePage;
