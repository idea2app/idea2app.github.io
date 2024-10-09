import { FC, HTMLAttributes, PropsWithRef } from 'react';

export type IconProps = PropsWithRef<
  HTMLAttributes<HTMLSpanElement> & {
    name: string;
  }
>;

export const Icon: FC<IconProps> = ({ className, name, ...props }) => (
  <span className={`material-symbols-outlined ${className}`} {...props}>
    {name}
  </span>
);

Icon.displayName = 'Icon';
