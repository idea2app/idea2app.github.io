import { Sheet, SheetContent } from '@/components/ui/sheet';
import { FC, PropsWithChildren } from 'react';

export interface ResponsiveDrawerProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const ResponsiveDrawer: FC<ResponsiveDrawerProps> = ({ open, onClose, children }) => {
  return (
    <>
      <aside className="bg-background/95 sticky top-20 hidden h-[calc(100vh-5rem)] w-[250px] shrink-0 border-r p-4 md:flex">
        {children}
      </aside>

      <Sheet open={open} onOpenChange={value => !value && onClose()}>
        <SheetContent side="left" className="w-[250px] p-4">
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
};
