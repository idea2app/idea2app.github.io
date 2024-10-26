import { TableCellValue } from 'mobx-lark';
import { ImageProps } from 'next/image';
import { FC } from 'react';

import { blobURLOf } from '../models/Base';
import { DefaultImage, fileURLOf } from '../pages/api/Lark/file/[id]';

export interface LarkImageProps extends Omit<ImageProps, 'src'> {
  src?: TableCellValue;
}

export const LarkImage: FC<LarkImageProps> = ({ className = '', src = '', alt, ...props }) => (
  <img
    className={className}
    loading="lazy"
    {...props}
    src={blobURLOf(src)}
    alt={alt}
    onError={({ currentTarget: image }) => {
      const path = fileURLOf(src);

      if (alt || !path) return;

      const errorURL = decodeURI(image.src);

      image.src = errorURL.endsWith(path)
        ? errorURL.endsWith(DefaultImage)
          ? ''
          : DefaultImage
        : path;
    }}
  />
);
