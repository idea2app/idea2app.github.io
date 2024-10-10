import Image from 'next/image';
import { FC } from 'react';

import { Client } from '../../models/Client';
import { fileURLOf } from '../../pages/api/Lark/file/[id]';

export interface PartnerProps extends Client {
  className?: string;
}

export const Partner: FC<PartnerProps> = ({ className = '', name, image, summary, address }) => (
  <div
    className={`flex flex-col items-center justify-center relative gap-4 ${className}`}
  >
    <Image
      className="object-fill h-20"
      loading="lazy"
      src={fileURLOf(image)}
      alt={`partner ${String(name)} logo`}
    />
    <h3>
      <a className="stretched-link" target="_blank" href={String(address)} rel="noreferrer">
        {String(name)}
      </a>
    </h3>
    <p className="text-muted">{String(summary)}</p>
  </div>
);
