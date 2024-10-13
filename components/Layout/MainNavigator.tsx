import { AppBar, Drawer, IconButton, PopoverProps, Tab, Tabs, Toolbar } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { Component } from 'react';

import Link from 'next/link';
import { Icon } from '../Icon';
import ColorModeIconDropdown from './ColorModeDropdown';

export const mainNavLinks = () => [
  { title: 'Projects', href: '/projects' },
  { title: 'Members', href: '/members' },
  { title: 'Careers', href: '/careers' }
];

@observer
export class MainNavigator extends Component {
  @observable accessor menuExpand = false;
  @observable accessor menuAnchor: PopoverProps['anchorEl'] = null;

  renderLinks = () =>
    mainNavLinks().map(({ title, href }) => (
      <Tab component={Link} key={title} href={href} label={title} value={href} />
    ));

  renderDrawer = () => (
    <nav className="sm:hidden">
      <IconButton
        aria-label="nav links"
        aria-controls="drawer"
        aria-haspopup="true"
        onClick={() => (this.menuExpand = true)}
      >
        <Icon name="menu" />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="top"
        ModalProps={{ keepMounted: true }}
        PaperProps={{ className: 'w-full bg-transparent shadow-none bg-none' }}
        open={this.menuExpand}
        onClose={() => (this.menuExpand = false)}
      >
        <Toolbar disableGutters className="bg-transparent bg-none shadow-none" />
        <div className="bg-background-paper py-3 elevation-16">
          <ul className="flex flex-col items-center">{this.renderLinks()}</ul>
        </div>
      </Drawer>
    </nav>
  );

  render() {
    return (
      <AppBar color="transparent" className="fixed backdrop-blur" style={{ zIndex: 1201 }}>
        <Toolbar>
          <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-3">
            <ul className="flex flex-row items-center gap-3">
              {this.renderDrawer()}

              <Image src="/idea2app.svg" alt="brand logo" width={32} height={40} />
              <a className="font-bold uppercase" href="/">
                idea2app
              </a>
            </ul>

            <Tabs
              value="/projects"
              component="ul"
              aria-label="nav tabs"
              role="navigation"
              className="hidden justify-center gap-3 sm:flex"
            >
              {this.renderLinks()}
            </Tabs>

            <ul className="flex flex-row items-center gap-4">
              <ColorModeIconDropdown />
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
