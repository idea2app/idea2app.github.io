import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';

import { Name, SiteUrl, Summary } from '../models/configuration';

export type PageHeadProps = PropsWithChildren<
  Partial<Record<'title' | 'description' | 'ogImage' | 'type' | 'url', string>>
>;

export const PageHead: FC<PageHeadProps> = ({
  title,
  description = Summary,
  ogImage = 'https://github.com/idea2app.png',
  type = 'website',
  url = SiteUrl,
  children,
}) => {
  const fullTitle = (title ? `${title} - ` : '') + Name;
  const fullUrl = url.startsWith('/') ? `${SiteUrl}${url}` : url;

  return (
    <Head>
      {/* 基础 meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={Name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 规范链接 */}
      <link rel="canonical" href={fullUrl} />

      {children}
    </Head>
  );
};
