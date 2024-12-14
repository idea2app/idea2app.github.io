import { FC } from 'react';

import { Client } from '../../models/Client';
import { LarkImage } from '../Base/LarkImage';

export interface PartnerProps extends Client {
  className?: string;
}

export const Partner: FC<PartnerProps> = ({
  className = '',
  name,
  image,
  summary,
  address,
}) => (
  <div
    className={`d-flex flex-column align-items-center justify-content-center gap-3 position-relative ${className}`}
  >
    <LarkImage
      fluid
      className="object-fit-contain"
      style={{ height: '5rem' }}
      loading="lazy"
      src={image}
    />
    <h3>
      <a
        className="stretched-link"
        target="_blank"
        href={address?.toString()}
        rel="noreferrer"
      >
        {name + ''}
      </a>
    </h3>
    <p className="text-muted">{summary + ''}</p>
  </div>
);
