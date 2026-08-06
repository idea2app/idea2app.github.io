import { observable, reaction } from 'mobx';
import { persist, restore } from 'mobx-restful';
import { setCookie } from 'web-utility';

import { isServer } from './configuration';

export type ColorScheme = 'light' | 'dark';

const matchColorScheme = (color: ColorScheme) =>
  globalThis.matchMedia?.(`(prefers-color-scheme: ${color})`);

export class SystemModel {
  @persist()
  @observable
  accessor colorScheme: ColorScheme = matchColorScheme('dark')?.matches ? 'dark' : 'light';

  restored =
    !isServer() &&
    restore(this, 'System').then(() =>
      matchColorScheme('dark')?.addEventListener(
        'change',
        ({ matches }) => (this.colorScheme = matches ? 'dark' : 'light'),
      ),
    );
  disposer = reaction(
    () => this.colorScheme,
    scheme => {
      document.documentElement.dataset.bsTheme = scheme;
      document.documentElement.classList.toggle('dark', scheme === 'dark');
      setCookie('colorScheme', scheme, { path: '/' });
    },
  );

  toggleColorScheme = () =>
    (this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark');
}

export default new SystemModel();
