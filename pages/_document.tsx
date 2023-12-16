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
          href="https://npm.onmicrosoft.cn/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://npm.onmicrosoft.cn/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
