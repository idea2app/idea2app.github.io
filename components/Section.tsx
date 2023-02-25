import { FC } from 'react';
import { Button } from 'react-bootstrap';

import { i18n } from '../models/Translation';

export interface SectionProps {
  id?: string;
  title?: string;
  link?: string;
}

const { t } = i18n;

export const Section: FC<SectionProps> = ({ id, title, children, link }) => (
  <section>
    <h2 className="my-5 text-center" id={id}>
      {title}
    </h2>

    {children}

    {link && (
      <footer className="mt-5 text-center">
        <Button variant="outline-primary" size="sm" href={link}>
          {t('load_more')}
        </Button>
      </footer>
    )}
  </section>
);
