import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import Link from 'next/link';

import { i18n, I18nContext, LanguageName } from '../../models/Translation';
import { SymbolIcon } from '../Icon';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ColorModeIconDropdown } from './ColorModeDropdown';
import { BrandLogo, GithubIcon } from './Svg';
import { MenuLink } from './menu';

@observer
export class MainNavigator extends ObservedComponent<{ menu: MenuLink[] }, typeof i18n> {
  static contextType = I18nContext;

  @observable accessor menuExpand = false;

  switchI18n = (key: string) => {
    this.observedContext!.loadLanguages(key as keyof typeof LanguageName);
  };

  renderLinks = () =>
    this.props.menu.map(({ title, href, target }) => (
      <Button key={title} variant="ghost" asChild>
        <Link className="py-1" href={String(href)} target={target}>
          {title}
        </Link>
      </Button>
    ));

  renderI18nSwitch = () => {
    const { currentLanguage } = this.observedContext!;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="language selector">
            <SymbolIcon name="language" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(LanguageName).map(([key, name]) => (
            <DropdownMenuItem
              key={key}
              className={key === currentLanguage ? 'bg-accent' : ''}
              onClick={() => this.switchI18n(key)}
            >
              {name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  renderDrawer = () => (
    <nav className="md:hidden">
      <Sheet open={this.menuExpand} onOpenChange={open => (this.menuExpand = open)}>
        <SheetTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="nav links">
            <SymbolIcon name="menu" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12">
          <nav className="flex flex-col items-center gap-4">{this.renderLinks()}</nav>
        </SheetContent>
      </Sheet>
    </nav>
  );

  render() {
    return (
      <header className="bg-background/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-3">
          <div className="flex flex-row items-center gap-3">
            {this.renderDrawer()}

            <BrandLogo className="h-8 w-8 dark:!hidden" variant="black" />
            <BrandLogo className="hidden h-8 w-8 dark:!block" variant="white" />
            <Link translate="no" className="font-bold uppercase" href="/" rel="home">
              idea2app
            </Link>
          </div>

          <nav className="item-center hidden flex-row gap-2 md:flex">{this.renderLinks()}</nav>

          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <Button asChild variant="ghost" size="icon-sm" aria-label="idea2app's GitHub account">
              <Link href="https://github.com/idea2app" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
              </Link>
            </Button>
            <ColorModeIconDropdown />
            {this.renderI18nSwitch()}
          </div>
        </div>
      </header>
    );
  }
}
