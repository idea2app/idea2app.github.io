import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { DefaultImage, SiteUrl } from '../models/configuration';
import { LanguageCode, parseSSRContext } from '../models/Translation';

/**
 * Influence Google Search to display search results with the name "idea2app" instead of idea2.app
 * @see {@link https://developers.google.com/search/docs/appearance/site-names#how-site-names-in-google-search-are-created}
 */
const siteNameJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'idea2app',
  url: SiteUrl,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'idea2app',
  url: SiteUrl,
  logo: DefaultImage,
  sameAs: ['https://github.com/idea2app'],
  email: 'contact@idea2app.cn',
};

interface CustomDocumentProps {
  language: LanguageCode;
  colorScheme: 'light' | 'dark';
}

export default class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    return {
      ...(await Document.getInitialProps(context)),
      ...parseSSRContext<CustomDocumentProps>(context, ['language']),
    };
  }

  render() {
    const { language, colorScheme } = this.props;

    return (
      <Html lang={language} data-bs-theme={colorScheme}>
        <Head>
          <link rel="icon" href={DefaultImage} />
          <link rel="manifest" href="/manifest.json" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="idea2app" />
          <meta property="og:url" content={siteNameJsonLd.url} />

          <Script src="https://polyfill.web-cell.dev/feature/PWAManifest.js" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          />

          {/**
           * Subset the font to only include the relevant icons for your application using the &icon_names query parameter,
           * using an alphabetically sorted comma-separated list of icon names
           * @see {@link https://developers.google.com/fonts/docs/material_symbols#optimize_the_icon_font}
           * */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          />
          <script type="application/ld+json">{JSON.stringify(siteNameJsonLd)}</script>
          <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        </Head>

        <body>
          {/**
           * Preventing SSR flickering @see {@link https://mui.com/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering}
           */}
          <InitColorSchemeScript attribute="class" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
