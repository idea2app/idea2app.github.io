import { JSX } from 'react';

import { i18n } from '../../models/Translation';

export type MenuLink = Pick<JSX.IntrinsicElements['a'], 'href' | 'title' | 'target'>;

export const PublicMenu = ({ t }: typeof i18n) => [
  { title: t('latest_projects'), href: '/project' },
  { title: t('member'), href: '/member' },
  { title: t('open_source_project'), href: '/open-source' },
  { title: t('wiki'), href: '/wiki' },
  { title: t('github_reward'), href: '/project/reward/issue', target: '_top' },
];

export const PrivateMenu = ({ t }: typeof i18n) => [{ href: '/dashboard', title: t('overview') }];
