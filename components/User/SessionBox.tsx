import { User } from '@idea2app/data-server';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { JWTProps } from 'next-ssr-middleware';
import { Component, FC, HTMLAttributes, JSX } from 'react';

import { SymbolIcon } from '../Icon';
import { SessionForm } from './SessionForm';

export type MenuItem = Pick<JSX.IntrinsicElements['a'], 'href' | 'title'>;

export interface SessionBoxProps extends HTMLAttributes<HTMLDivElement>, JWTProps<User> {
  path?: string;
  menu?: MenuItem[];
}

interface ResponsiveDrawerProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const ResponsiveDrawer: FC<ResponsiveDrawerProps> = ({ open, onClose, children }) => {
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
          ...(isMobile
            ? {}
            : {
                position: 'sticky',
                top: '5rem',
                height: 'calc(100vh - 5rem)',
                border: 'none',
                boxShadow: 'none',
              }),
        },
      }}
    >
      {children}
    </Drawer>
  );
};

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  @observable
  accessor drawerOpen = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  };

  closeDrawer = () => {
    this.drawerOpen = false;
  };

  renderMenuItems() {
    const { path, menu = [] } = this.props;

    return (
      <List component="nav" sx={{ px: 2 }}>
        {menu.map(({ href, title }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component={Link}
              href={href || '#'}
              selected={path?.split('?')[0].startsWith(href || '')}
              sx={{ borderRadius: 1 }}
              onClick={this.closeDrawer}
            >
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }

  render() {
    const { className = '', children, jwtPayload, ...props } = this.props;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
        className={className}
        {...props}
      >
        {/* Mobile Menu Button */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            p: 1,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.toggleDrawer}
          >
            <SymbolIcon name="menu" />
          </IconButton>
        </Box>

        {/* Unified Responsive Drawer */}
        <ResponsiveDrawer open={this.drawerOpen} onClose={this.closeDrawer}>
          <Box sx={{ width: 250 }}>{this.renderMenuItems()}</Box>
        </ResponsiveDrawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            pb: 3,
            px: { xs: 2, sm: 3 },
          }}
        >
          {children}

          <Modal open={this.modalShown}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90vw', sm: 400 },
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
              }}
            >
              <SessionForm onSignIn={() => (this.modalShown = false)} />
            </Box>
          </Modal>
        </Box>
      </Box>
    );
  }
}
