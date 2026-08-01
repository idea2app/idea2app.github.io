import { FC, PropsWithChildren } from 'react';

export interface MasonryProps {
  component?: 'ul' | 'div';
  className?: string;
  columns?: { xs?: number; sm?: number; md?: number };
  spacing?: number;
  defaultHeight?: number;
  defaultColumns?: number;
  defaultSpacing?: number;
}

const Masonry: FC<PropsWithChildren<MasonryProps>> = ({ component = 'div', className, children }) => {
  const Tag = component;

  return <Tag className={`columns-1 gap-4 sm:columns-2 md:columns-3 ${className || ''}`}>{children}</Tag>;
};

export default Masonry;
