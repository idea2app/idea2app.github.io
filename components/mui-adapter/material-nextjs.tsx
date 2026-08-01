import Document, { DocumentContext } from 'next/document';
import { FC, PropsWithChildren } from 'react';

export const createEmotionCache = (_options?: unknown) => ({ key: 'css' });

export const AppCacheProvider: FC<PropsWithChildren<{ emotionCache?: unknown }>> = ({ children }) => (
  <>{children}</>
);

export const documentGetInitialProps = async (context: DocumentContext, _options?: unknown) =>
  Document.getInitialProps(context);
