import { AppBar, Drawer, IconButton, PopoverProps, Toolbar } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';
import { Component, SyntheticEvent } from 'react';

import { i18n } from '../../models/Translation';
import { SymbolIcon } from '../Icon';
import ColorModeIconDropdown from './ColorModeDropdown';

const { t } = i18n;

export const mainNavLinks = () => [
  { title: t('latest_projects'), href: '/project' },
  { title: t('member'), href: '/member' },
  { title: t('open_source_project'), href: '/open-source' }
];

@observer
export class MainNavigator extends Component {
  @observable accessor menuExpand = false;
  @observable accessor menuAnchor: PopoverProps['anchorEl'] = null;
  @observable accessor eventKey = 0;

  handleChange = (event: SyntheticEvent, newValue: number) => {
    this.eventKey = newValue;
  };

  renderLinks = () =>
    mainNavLinks().map(({ title, href }) => (
      <Link key={title} className="py-1" href={href}>
        {title}
      </Link>
    ));

  renderDrawer = () => (
    <nav className="sm:hidden">
      <IconButton
        aria-label="nav links"
        aria-controls="drawer"
        aria-haspopup="true"
        onClick={() => (this.menuExpand = true)}
      >
        <SymbolIcon name="menu" />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="top"
        ModalProps={{ keepMounted: true }}
        PaperProps={{ className: 'w-full bg-transparent shadow-none bg-none' }}
        open={this.menuExpand}
        onClose={() => (this.menuExpand = false)}
      >
        <Toolbar className="bg-transparent bg-none shadow-none" disableGutters />
        <div className="bg-background-paper py-3 elevation-16">
          <nav className="flex flex-col items-center gap-4">{this.renderLinks()}</nav>
        </div>
      </Drawer>
    </nav>
  );

  render() {
    return (
      <AppBar color="transparent" className="fixed backdrop-blur" style={{ zIndex: 1201 }}>
        <Toolbar>
          <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-3">
            <div className="flex flex-row items-center gap-3">
              {this.renderDrawer()}

              <Image src="/idea2app.svg" alt="brand logo" width={32} height={40} />
              <Link translate="no" className="font-bold uppercase" href="/">
                idea2app
              </Link>
            </div>

            <nav className="item-center hidden flex-row gap-4 sm:flex">{this.renderLinks()}</nav>

            <div className="flex flex-row items-center gap-4">
              <ColorModeIconDropdown />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
