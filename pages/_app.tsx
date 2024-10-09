import '../styles/main.css';

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import { AppProps } from 'next/app';

import { Footer } from '../components/Layout/Footer';
import { MainNavigator } from '../components/Layout/MainNavigator';
import { isServer } from '../models/Base';
import Head from 'next/head';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

globalThis.addEventListener?.('unhandledrejection', ({ reason }) => {
  const { message, response } = reason as HTTPError<{ message?: string }>;
  const { statusText, body } = response || {};

  const errorMessage = body?.message ?? statusText ?? message;

  if (errorMessage) alert(errorMessage);
});

const rootElement = isServer() ? null : document.getElementById('__next');

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
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiModal: {
      defaultProps: {
        container: rootElement
      }
    }
  }
});

const AppShell = observer(({ Component, pageProps }: AppProps<{}>) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <StyledEngineProvider injectFirst>
      {/**
       * @see {@link https://mui.com/material-ui/integrations/interoperability/#tailwind-css}
       */}
      <ThemeProvider theme={theme} defaultMode="system" disableTransitionOnChange>
        <MainNavigator />

        <div>
          <Component {...pageProps} />
        </div>

        <Footer />
      </ThemeProvider>
    </StyledEngineProvider>
  </>
));

export default AppShell;
