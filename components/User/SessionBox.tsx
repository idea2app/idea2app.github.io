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
} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { JWTProps } from 'next-ssr-middleware';
import { Component, HTMLAttributes, JSX } from 'react';

import { SessionForm } from './SessionForm';

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export type MenuItem = Pick<JSX.IntrinsicElements['a'], 'href' | 'title'>;

export interface SessionBoxProps extends HTMLAttributes<HTMLDivElement>, JWTProps<User> {
  path?: string;
  menu?: MenuItem[];
}

@observer
export class SessionBox extends Component<SessionBoxProps> {
  @observable
  accessor modalShown = false;

  @observable
  accessor mobileMenuOpen = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  toggleMobileMenu = () => {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  };

  closeMobileMenu = () => {
    this.mobileMenuOpen = false;
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
              onClick={this.closeMobileMenu}
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
            onClick={this.toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={this.mobileMenuOpen}
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClose={this.closeMobileMenu}
        >
          <Box sx={{ width: 250 }}>{this.renderMenuItems()}</Box>
        </Drawer>

        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: '5rem',
            }}
          >
            {this.renderMenuItems()}
          </Box>
        </Box>

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
