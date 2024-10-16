import { FC, PropsWithChildren, ReactNode } from 'react';

export type EdgePosition = 'top' | 'bottom' | 'left' | 'right';

export type TouchHandler = (edge: EdgePosition) => void;

export type ScrollBoundaryProps = PropsWithChildren<
  Partial<Record<EdgePosition, ReactNode>> & {
    className?: string;
    onTouch: TouchHandler;
  }
>;

function touch(edge: EdgePosition, onTouch: TouchHandler) {
  return (node: HTMLElement | null) => {
    if (node) {
      new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          onTouch(edge);
        }
      }).observe(node);
    }
  };
}

export const ScrollBoundary: FC<ScrollBoundaryProps> = ({
  className = '',
  onTouch,
  top,
  left,
  right,
  bottom,
  children
}) => (
  <div className={className} style={{ position: 'relative' }}>
    <div
      ref={touch('top', onTouch)}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
    >
      {top}
    </div>
    <div
      ref={touch('left', onTouch)}
      style={{ position: 'absolute', top: 0, left: 0, height: '100%' }}
    >
      {left}
    </div>

    {children}

    <div
      ref={touch('right', onTouch)}
      style={{ position: 'absolute', top: 0, right: 0, height: '100%' }}
    >
      {right}
    </div>
    <div
      ref={touch('bottom', onTouch)}
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
    >
      {bottom}
    </div>
  </div>
);

ScrollBoundary.displayName = 'ScrollBoundary';
