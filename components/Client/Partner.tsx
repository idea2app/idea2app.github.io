import { FC } from 'react';
import { Image } from 'react-bootstrap';

import { Client } from '../../models/Client';
import { fileURLOf } from '../../pages/api/Lark/file/[id]';

export interface PartnerProps extends Client {
  className?: string;
}

export const Partner: FC<PartnerProps> = ({
  className = '',
  name,
  image,
  summary,
}) => (
  <div
    className={`d-flex flex-column align-items-center justify-content-center gap-4 ${className}`}
  >
    <Image
      className="object-fit-cover"
      style={{ height: '5rem' }}
      loading="lazy"
      src={fileURLOf(image)}
    />
    <h3>{name}</h3>

    <p className="text-muted">{summary}</p>
  </div>
);
