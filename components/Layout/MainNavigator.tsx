import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  PopoverProps,
  Toolbar,
} from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Image from 'next/image';
import Link from 'next/link';
import { Component } from 'react';

import { i18n, LanguageName, t } from '../../models/Translation';
import { SymbolIcon } from '../Icon';
import { ColorModeIconDropdown } from './ColorModeDropdown';
import { BrandLogo, GithubIcon } from './Svg';

export const mainNavLinks = () => [
  { title: t('latest_projects'), href: '/project' },
  { title: t('member'), href: '/member' },
  { title: t('open_source_project'), href: '/open-source' },
];

@observer
export class MainNavigator extends Component {
  @observable accessor menuExpand = false;
  @observable accessor menuAnchor: PopoverProps['anchorEl'] = null;

  switchI18n = (key: string) => {
    i18n.changeLanguage(key as keyof typeof LanguageName);
    this.menuAnchor = null;
  };

  renderLinks = () =>
    mainNavLinks().map(({ title, href }) => (
      <Link key={title} className="py-1" href={href}>
        {title}
      </Link>
    ));

  renderI18nSwitch = () => {
    const { currentLanguage } = i18n,
      { menuAnchor } = this;

    return (
      <>
        <IconButton
          color="inherit"
          aria-label="language selector"
          id="i18n-selector"
          onClick={event => (this.menuAnchor = event.currentTarget)}
        >
          <SymbolIcon name="language" />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          id="i18n-menu"
          slotProps={{
            paper: {
              variant: 'outlined',
              sx: { my: '4px' },
            },
          }}
          open={Boolean(menuAnchor)}
          onClose={() => (this.menuAnchor = null)}
        >
          {Object.entries(LanguageName).map(([key, name]) => (
            <MenuItem
              key={key}
              value={key}
              selected={key === currentLanguage}
              onClick={() => this.switchI18n(key)}
            >
              {name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

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
        <Toolbar disableGutters />
        <div className="bg-background-paper elevation-16 py-3">
          <nav className="flex flex-col items-center gap-4">{this.renderLinks()}</nav>
        </div>
      </Drawer>
    </nav>
  );

  render() {
    return (
      <AppBar color="transparent" className="fixed backdrop-blur-sm" style={{ zIndex: 1201 }}>
        <Toolbar>
          <div className="container mx-auto flex max-w-(--breakpoint-xl) items-center justify-between px-3">
            <div className="flex flex-row items-center gap-3">
              {this.renderDrawer()}

              <BrandLogo />
              <Link translate="no" className="font-bold uppercase" href="/" rel="home">
                idea2app
              </Link>
            </div>

            <nav className="item-center hidden flex-row gap-4 sm:flex">{this.renderLinks()}</nav>

            <div className="flex flex-row items-center gap-3 sm:gap-6">
              <Link
                href="https://github.com/idea2app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="idea2app's GitHub account"
              >
                <GithubIcon />
              </Link>
              <ColorModeIconDropdown />
              {this.renderI18nSwitch()}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
