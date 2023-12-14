import '../styles/globals.less';

import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

import { isServer } from '../models/Base';
import { i18n } from '../models/Translation';

const LanguageMenu = dynamic(() => import('../components/LanguageMenu'), {
    ssr: false,
  }),
  { t } = i18n;

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

globalThis.addEventListener?.('unhandledrejection', ({ reason }) => {
  var { message, statusText } = reason as HTTPError;

  message = statusText || message;

  if (message) alert(message);
});

const Name = process.env.NEXT_PUBLIC_SITE_NAME || '';

const AppShell = observer(({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Navbar bg="white" variant="light" fixed="top" expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          <span className="visually-hidden">{Name}</span>
          <Image
            style={{ width: '3rem' }}
            src="https://github.com/idea2app.png"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-inner" />

        <Navbar.Collapse id="navbar-inner">
          <Nav className="ms-auto me-3">
            <Nav.Link href="/project">{t('latest_projects')}</Nav.Link>

            <Nav.Link
              target="_blank"
              href="https://idea2app.feishu.cn/docx/THOEdTXzGopJnGxFlLocb8wVnkf"
            >
              {t('careers')}
            </Nav.Link>

            <Nav.Link href="/open-source">{t('open_source_project')}</Nav.Link>

            <Nav.Link href="/member">{t('member')}</Nav.Link>

            <Nav.Link href="/#partner">{t('partner')}</Nav.Link>

            <Nav.Link target="_blank" href="https://github.com/idea2app">
              GitHub
            </Nav.Link>
          </Nav>

          <LanguageMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className="mt-5 pt-2">
      <Component {...pageProps} />
    </div>

    <footer className="flex-fill d-flex justify-content-center align-items-center border-top py-4">
      <a
        className="flex-fill d-flex justify-content-center align-items-center"
        href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('powered_by')}
        <span className="mx-2">
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </>
));

export default AppShell;
