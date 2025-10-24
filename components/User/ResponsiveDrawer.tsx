import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const DESKTOP_DRAWER_STYLES = {
  position: 'sticky',
  top: '5rem',
  height: 'calc(100vh - 5rem)',
  border: 'none',
  boxShadow: 'none',
} as const;

export interface ResponsiveDrawerProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const ResponsiveDrawer: FC<ResponsiveDrawerProps> = ({ open, onClose, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor="left"
      open={isMobile ? open : true}
      variant={isMobile ? 'temporary' : 'permanent'}
      onClose={onClose}
      sx={{
        display: { xs: isMobile ? 'block' : 'none', md: isMobile ? 'none' : 'block' },
        '& .MuiDrawer-paper': {
          width: 250,
          ...(isMobile ? {} : DESKTOP_DRAWER_STYLES),
        },
      }}
    >
      {children}
    </Drawer>
  );
};
