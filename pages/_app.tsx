import '../styles/main.css';

import { EmotionCache } from '@emotion/cache';
import { createTheme, GlobalStyles, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { AppCacheProvider, createEmotionCache } from '@mui/material-nextjs/v15-pagesRouter';
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

const clientCache = createEmotionCache({ enableCssLayer: true, key: 'css' });

@observer
export default class CustomApp extends App<I18nProps & { emotionCache: EmotionCache }> {
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
    const { Component, pageProps, emotionCache = clientCache } = this.props;

    return (
      <I18nContext.Provider value={this.i18nStore}>
        <AppCacheProvider emotionCache={emotionCache}>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
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
        </AppCacheProvider>
      </I18nContext.Provider>
    );
  }
}
