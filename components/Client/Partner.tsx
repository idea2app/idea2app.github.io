import { FC, ReactNode } from 'react';

import { fileURLOf } from '../../models/Base';
import { Client } from '../../models/Client';
import { LarkImage } from '../LarkImage';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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
    <LarkImage className="h-20 object-fill" src={fileURLOf(String(image))} alt={String(name)} />
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
    <Tooltip key={name}>
      <TooltipTrigger asChild>
        <span>
          <LogoWithLink name={name} {...rest} />
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    <LogoWithLink key={name} name={name} {...rest} />
  );

export const LogoWithLink: FC<Omit<PartnerOverviewProps, 'tooltip'>> = ({
  name,
  address,
  logo,
  logoDark,
  className,
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
