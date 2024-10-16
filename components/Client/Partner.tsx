import { Tooltip } from '@mui/material';
import { FC, ReactNode } from 'react';

import { Client } from '../../models/Client';
import { fileURLOf } from '../../pages/api/Lark/file/[id]';

export interface PartnerProps extends Client {
  className?: string;
}

export interface PartnerOverviewProps extends Record<'name' | 'logo' | 'address', string> {
  logoDark?: string;
  className?: string;
  tooltip?: ReactNode;
}

export const Partner: FC<PartnerProps> = ({ className = '', name, image, summary, address }) => (
  <div className={`relative flex flex-col items-center justify-center gap-4 ${className}`}>
    <img
      className="h-20 object-fill"
      loading="lazy"
      src={fileURLOf(String(image))}
      alt={String(name)}
    />
    <h3>
      <a className="stretched-link" target="_blank" href={String(address)} rel="noreferrer">
        {String(name)}
      </a>
    </h3>
    <p className="text-muted">{String(summary)}</p>
  </div>
);

export const PartnerOverview: FC<PartnerOverviewProps> = ({ name, tooltip, ...rest }) =>
  tooltip ? (
    <Tooltip key={name} title={tooltip}>
      <LogoWithLink name={name} {...rest} />
    </Tooltip>
  ) : (
    <LogoWithLink key={name} name={name} {...rest} />
  );

export const LogoWithLink: FC<Omit<PartnerOverviewProps, 'tooltip'>> = ({
  name,
  address,
  logo,
  logoDark,
  className
}) => (
  <a
    key={name}
    href={address}
    className="flex items-center justify-center"
    target="_blank"
    rel="noreferrer"
  >
    <img
      className={`max-h-24 min-h-2 dark:hidden ${className}`}
      loading="lazy"
      src={logoDark ?? logo}
      alt={name}
    />
    <img
      className={`hidden max-h-24 min-h-2 dark:block ${className}`}
      loading="lazy"
      src={logo}
      alt={name}
    />
  </a>
);
