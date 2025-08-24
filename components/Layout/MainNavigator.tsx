import { AppBar, Drawer, IconButton, Menu, MenuItem, PopoverProps, Toolbar } from '@mui/material';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import Link from 'next/link';

import { i18n, I18nContext, LanguageName } from '../../models/Translation';
import { SymbolIcon } from '../Icon';
import { ColorModeIconDropdown } from './ColorModeDropdown';
import { BrandLogo, GithubIcon } from './Svg';

@observer
export class MainNavigator extends ObservedComponent<{}, typeof i18n> {
  static contextType = I18nContext;

  @observable accessor menuExpand = false;
  @observable accessor menuAnchor: PopoverProps['anchorEl'] = null;

  @computed
  get links() {
    const { t } = this.observedContext!;

    return [
      { title: t('latest_projects'), href: '/project' },
      { title: t('member'), href: '/member' },
      { title: t('open_source_project'), href: '/open-source' },
      { title: t('wiki'), href: '/wiki' },
      { title: t('github_reward'), href: '/project/reward/issue', target: '_top' },
    ];
  }

  switchI18n = (key: string) => {
    this.observedContext!.loadLanguages(key as keyof typeof LanguageName);
    this.menuAnchor = null;
  };

  renderLinks = () =>
    this.links.map(({ title, href, target }) => (
      <Link key={title} className="py-1" href={href} target={target}>
        {title}
      </Link>
    ));

  renderI18nSwitch = () => {
    const { currentLanguage } = this.observedContext!,
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
          slotProps={{ paper: { variant: 'outlined', sx: { my: '4px' } } }}
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
    <nav className="md:hidden">
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
        slotProps={{ paper: { className: 'w-full bg-transparent shadow-none bg-none' } }}
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
      <AppBar color="transparent" className="fixed z-[1201] backdrop-blur-sm">
        <Toolbar>
          <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-3">
            <div className="flex flex-row items-center gap-3">
              {this.renderDrawer()}

              <BrandLogo />
              <Link translate="no" className="font-bold uppercase" href="/" rel="home">
                idea2app
              </Link>
            </div>

            <nav className="item-center hidden flex-row gap-4 md:flex">{this.renderLinks()}</nav>

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
