import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';

export type PageHeadProps = PropsWithChildren<{
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}>;

const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY,
  SiteUrl = 'https://idea2.app';

export const PageHead: FC<PageHeadProps> = ({
  title,
  description = Summary,
  image = 'https://github.com/idea2app.png',
  type = 'website',
  url = SiteUrl,
  children,
}) => {
  const fullTitle = (title ? `${title} - ` : '') + Name;

  return (
    <Head>
      {/* 基础 meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={Name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 规范链接 */}
      <link rel="canonical" href={url} />

      {children}
    </Head>
  );
};
