import { FC, PropsWithChildren } from 'react';

import { i18n } from '../models/Translation';
import { Button } from '@mui/material';
import Link from 'next/link';

export type SectionProps = PropsWithChildren<
  Partial<Record<'id' | 'title' | 'link' | 'className', string>>
>;

const { t } = i18n;

export const Section: FC<SectionProps> = ({ id, title, children, link, className }) => (
  <section className={`mx-auto flex max-w-screen-xl flex-col gap-6 py-8 ${className}`}>
    <h2 className="text-center" id={id}>
      {title}
    </h2>

    {children}

    {link && (
      <footer className="text-center">
        <Button component={Link} href={link} aria-label={`load more ${title}`}>
          {t('load_more')}
        </Button>
      </footer>
    )}
  </section>
);
