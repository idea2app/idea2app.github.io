import '../styles/main.css';

import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Footer } from '../components/Layout/Footer';
import { MainNavigator } from '../components/Layout/MainNavigator';
import { PrivateMenu, PublicMenu } from '../components/Layout/menu';
import { isServer } from '../models/configuration';
import { createI18nStore, I18nContext, I18nProps, loadSSRLanguage } from '../models/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

@observer
export default class CustomApp extends App<I18nProps> {
  static async getInitialProps(context: AppContext) {
    return {
      ...(await App.getInitialProps(context)),
      ...(await loadSSRLanguage(context.ctx)),
    };
  }

  i18nStore = createI18nStore(this.props.language, this.props.languageMap);

  componentDidMount() {
    window.addEventListener('unhandledrejection', ({ reason }) => {
      const { message, response } = reason as HTTPError<{ message?: string }>;
      const { statusText, body } = response || {};

      const errorMessage = body?.message ?? statusText ?? message;

      if (errorMessage) alert(errorMessage);
    });
  }

  render() {
    const { router, Component, pageProps } = this.props;
    const { asPath } = router,
      { i18nStore } = this;
    const menu = asPath.startsWith('/dashboard') ? PrivateMenu(i18nStore) : PublicMenu(i18nStore);

    return (
      <I18nContext.Provider value={i18nStore}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col justify-between">
            <MainNavigator menu={menu} />

            <Component {...pageProps} />

            <Footer />
          </div>
        </TooltipProvider>
      </I18nContext.Provider>
    );
  }
}
