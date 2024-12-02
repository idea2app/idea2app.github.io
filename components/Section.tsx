import { observer } from 'mobx-react';
import { FC, PropsWithChildren } from 'react';
import { Button } from 'react-bootstrap';

import { t } from '../models/Translation';

export type SectionProps = PropsWithChildren<
  Partial<Record<'id' | 'title' | 'link', string>>
>;

export const Section: FC<SectionProps> = observer(
  ({ id, title, children, link }) => (
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
  ),
);
