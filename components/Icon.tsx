import { FC, HTMLAttributes, PropsWithRef } from 'react';

export type IconProps = PropsWithRef<
  HTMLAttributes<HTMLSpanElement> & {
    name: string;
    variant?: 'outlined' | 'rounded' | 'sharp';
  }
>;

export const SymbolIcon: FC<IconProps> = ({ className, name, variant = 'outlined', ...props }) => (
  <span
    aria-hidden="false"
    aria-label={`${name} icon`}
    className={`material-symbols-${variant} ${className}`}
    {...props}
  >
    {name}
  </span>
);

SymbolIcon.displayName = 'SymbolIcon';
