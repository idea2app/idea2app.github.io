import { TableCellValue } from 'mobx-lark';
import { ImageProps } from 'next/image';
import { FC } from 'react';

import { fileURLOf } from '../models/Base';
import { DefaultImage } from '../models/configuration';

export interface LarkImageProps extends Omit<ImageProps, 'src'> {
  src?: TableCellValue;
}

export const LarkImage: FC<LarkImageProps> = ({ src = DefaultImage, alt, ...props }) => (
  <img
    loading="lazy"
    {...props}
    src={fileURLOf(src, true)}
    alt={alt}
    onError={({ currentTarget: image }) => {
      const path = fileURLOf(src),
        errorURL = decodeURI(image.src);

      if (!path) return;

      if (errorURL.endsWith(path)) {
        if (!alt) image.src = DefaultImage;
      } else if (!errorURL.endsWith(DefaultImage)) {
        image.src = path;
      }
    }}
  />
);
