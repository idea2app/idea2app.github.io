import { Button } from '@mui/material';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { t } from '../../models/Translation';

export type SectionProps = PropsWithChildren<
  Partial<Record<'id' | 'title' | 'link' | 'className', string>>
>;

export const Section: FC<SectionProps> = observer(
  ({ id, title, children, link, className = '' }) => (
    <section className={`mx-auto flex max-w-(--breakpoint-xl) flex-col gap-6 py-8 ${className}`}>
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
  ),
);
