import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

import { Partner } from '../components/Client/Partner';
import { GitListLayout } from '../components/Git';
import { MemberListLayout } from '../components/Member/List';
import { PageHead } from '../components/PageHead';
import { ProjectListLayout } from '../components/Project';
import { Section } from '../components/Section';
import { ClientModel } from '../models/Client';
import { MemberModel } from '../models/Member';
import { ProjectModel } from '../models/Project';
import { RepositoryModel } from '../models/Repository';
import { i18n } from '../models/Translation';
import styles from '../styles/Home.module.less';
import { getTarget, withErrorLog, withTranslation } from './api/core';
import { service } from './api/home';

export const getServerSideProps = withErrorLog(
  withTranslation(async () => {
    const [projects, repositories, partners, members] = await Promise.all([
      new ProjectModel().getList({}, 1, 9),
      new RepositoryModel().getList(),
      new ClientModel().getList({ partnership: '战略合作' }),
      new MemberModel().getList({ type: '全职' }),
    ]);

    return {
      props: {
        projects,
        repositories,
        partners,
        members: [...members].sort(
          ({ joinedAt: a }, { joinedAt: b }) =>
            +new Date(a as number) - +new Date(b as number),
        ),
      },
    };
  }),
);

const { t } = i18n;

const HomePage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ projects, repositories, partners, members }) => (
    <>
      <PageHead />

      <Container as="main" className={styles.main}>
        <h1 className={`mb-5 text-center ${styles.title}`}>
          <span className="visually-hidden">idea2app</span>
          <Image src="https://github.com/idea2app.png" alt="idea2app logo" />
        </h1>
        <p className={`text-center fs-4 ${styles.description}`}>
          {t('idea2app_summary')}
        </p>
        <p className={`text-center fs-4 ${styles.description}`}>
          {t('idea2app_slogan')}
        </p>

        <Row className="mt-5 g-4" xs={1} sm={2} md={3}>
          {service().map(({ title, summary, buttonText, buttonLink }) => (
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
                  {buttonText && buttonLink && (
                    <Button href={buttonLink} target={getTarget(buttonLink)}>
                      {buttonText}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Section title={t('latest_projects')} link="/project">
          <ProjectListLayout defaultData={projects} />
        </Section>

        <Section title={t('open_source_project')} link="/open-source">
          <GitListLayout defaultData={repositories} />
        </Section>

        <Section title={t('member')} link="/member">
          <MemberListLayout defaultData={members} />
        </Section>

        <Section title={t('partner')} id="partner">
          <Row as="ul" className="list-unstyled g-4" xs={1} sm={2} md={4}>
            {partners.map(item => (
              <Col as="li" key={item.id + ''}>
                <Partner className="h-100" {...item} />
              </Col>
            ))}
          </Row>
        </Section>
      </Container>
    </>
  ));

export default HomePage;
