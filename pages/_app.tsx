import '../styles/main.css';

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';

import { Footer } from '../components/Layout/Footer';
import { MainNavigator } from '../components/Layout/MainNavigator';
import { isServer } from '../models/configuration';
import { createI18nStore, I18nContext, I18nProps, loadSSRLanguage } from '../models/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

const container = isServer() ? null : document.getElementById('__next');

export const theme = createTheme({
  colorSchemes: { dark: true, light: true },
  /**
   * @see {@link  https://mui.com/material-ui/customization/css-theme-variables/usage/#adding-new-theme-tokens}
   * @see {@link  https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually}
   */
  cssVariables: { colorSchemeSelector: 'class' },
  /**
   * add your custom token here, Palette, Typography, etc. @see {@link  https://mui.com/material-ui/customization/palette/} for more details
   */
  components: {
    /**
     * target root element for Portal-related elements, for tailwind support @see {@link  https://mui.com/material-ui/integrations/interoperability/#setup}
     * */
    MuiPopover: { defaultProps: { container } },
    MuiPopper: { defaultProps: { container } },
    MuiDialog: { defaultProps: { container } },
    MuiModal: { defaultProps: { container } },
  },
});

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
    const { Component, pageProps, router } = this.props,
      { t } = this.i18nStore;

    return (
      <I18nContext.Provider value={this.i18nStore}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <StyledEngineProvider injectFirst>
          {/**
           * @see {@link https://mui.com/material-ui/integrations/interoperability/#tailwind-css}
           */}
          <ThemeProvider theme={theme} defaultMode="system" disableTransitionOnChange>
            <div className="flex min-h-screen flex-col justify-between">
              <MainNavigator />

              <Component {...pageProps} />

              <Footer />
            </div>
          </ThemeProvider>
        </StyledEngineProvider>
      </I18nContext.Provider>
    );
  }
}
