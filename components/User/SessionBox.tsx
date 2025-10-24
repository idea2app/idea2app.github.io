import { User } from '@idea2app/data-server';
import {
  Box,
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

import { SymbolIcon } from '../Icon';
import { ResponsiveDrawer } from './ResponsiveDrawer';
import { SessionForm } from './SessionForm';

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
  accessor drawerOpen = false;

  componentDidMount() {
    this.modalShown = !this.props.jwtPayload;
  }

  toggleDrawer = () => (this.drawerOpen = !this.drawerOpen);

  closeDrawer = () => (this.drawerOpen = false);

  renderMenuItems() {
    const { path, menu = [] } = this.props;

    return (
      <List component="nav" className="px-2">
        {menu.map(({ href, title }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component={Link}
              href={href || '#'}
              selected={path?.split('?')[0].startsWith(href || '')}
              className="rounded"
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
      <div className={`flex flex-col md:flex-row ${className}`} {...props}>
        {/* Mobile Menu Button */}
        <div className="sticky top-0 z-[1100] flex border-b p-1 md:hidden bg-background-paper border-divider">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.toggleDrawer}
          >
            <SymbolIcon name="menu" />
          </IconButton>
        </div>

        {/* Unified Responsive Drawer */}
        <ResponsiveDrawer open={this.drawerOpen} onClose={this.closeDrawer}>
          <div className="w-[250px]">{this.renderMenuItems()}</div>
        </ResponsiveDrawer>

        {/* Main Content */}
        <main className="flex-1 px-2 pb-3 sm:px-3">
          {children}

          <Modal open={this.modalShown}>
            <Box
              className="absolute left-1/2 top-1/2 w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded p-4 shadow-2xl sm:w-[400px] bg-background-paper"
              sx={{ boxShadow: 24 }}
            >
              <SessionForm onSignIn={() => (this.modalShown = false)} />
            </Box>
          </Modal>
        </main>
      </div>
    );
  }
}
