import { FC, PropsWithChildren } from 'react';

import { i18n } from '../models/Translation';
import { Button } from '@mui/material';

export type SectionProps = PropsWithChildren<Partial<Record<'id' | 'title' | 'link', string>>>;

const { t } = i18n;

export const Section: FC<SectionProps> = ({ id, title, children, link }) => (
  <section>
    <h2 className="my-5 text-center" id={id}>
      {title}
    </h2>

    {children}

    {link && (
      <footer className="mt-5 text-center">
        <Button variant="outlined" size="small" href={link}>
          {t('load_more')}
        </Button>
      </footer>
    )}
  </section>
);
