import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="https://github.com/idea2app.png" />

        <link rel="manifest" href="/manifest.json" />
        <script src="https://polyfill.web-cell.dev/feature/PWAManifest.js"></script>

        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/idea-react@1.0.0-alpha.0/dist/index.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
