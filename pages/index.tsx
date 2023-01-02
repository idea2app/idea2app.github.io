import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { GitCard } from '../components/Git/Card';
import { PageHead } from '../components/PageHead';
import projectStore from '../models/Project';
import { i18n } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { withTranslation } from './api/core';
import { framework } from './api/home';

export const getServerSideProps = withTranslation(async () => {
  projectStore.clear();

  const projects = await projectStore.getList({}, 1, 9);

  return {
    props: { projects },
  };
});

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ projects }) => (
    <>
      <PageHead />

      <Container as="main" className={styles.main}>
        <h1 className={`mb-5 text-center ${styles.title}`}>idea2app</h1>

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

        <h2 className="my-4 text-center">{t('upstream_projects')}</h2>
        <Row className="g-4" xs={1} sm={2} md={3}>
          {framework.map(
            ({ title, languages, tags, summary, link, repository }) => (
              <Col key={title}>
                <GitCard
                  className={`h-100 ${styles.card}`}
                  full_name={title}
                  html_url={repository}
                  homepage={link}
                  languages={languages}
                  topics={tags}
                  description={summary}
                />
              </Col>
            ),
          )}
        </Row>
      </Container>
    </>
  ));

export default HomePage;
