/* eslint-disable @next/next/no-sync-scripts */
import { ErrorProps } from 'next/error';
import { FC, useContext } from 'react';

import { I18nContext } from '../models/Translation';

export const NotFoundCard: FC<ErrorProps> = ({ title }) => {
  const { currentLanguage } = useContext(I18nContext);

  return currentLanguage.startsWith('zh') ? (
    <script
      src="//cdn.dnpw.org/404/v1.min.js"
      // @ts-expect-error https://www.dnpw.org/cn/pa-notfound.html
      jumptarget="/"
      jumptime="-1"
      error={title}
    />
  ) : (
    <iframe
      className="vh-100 w-100 border-0"
      src="https://notfound-static.fwebservices.be/en/404?key=66abb751ed312"
    />
  );
};
