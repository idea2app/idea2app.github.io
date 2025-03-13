import { DataObject, Filter, ListModel } from 'mobx-restful';
import { FC, HTMLAttributes } from 'react';

import { i18n } from '../../models/Translation';
import { PageHead } from '../PageHead';
import { ScrollList } from '../ScrollList';

export interface ScrollListPageProps<D extends DataObject, F extends Filter<D> = Filter<D>>
  extends HTMLAttributes<HTMLDivElement> {
  store: ListModel<D, F>;
  filter?: F;
  defaultData?: D[];
  title: string;
  header: string;
  scrollList?: boolean;
  Layout: FC<{ defaultData: D[]; className?: string }>;
}

/**
 * @todo remove ScrollList and use children instead?
 */
export const ScrollListPage = <D extends DataObject, F extends Filter<D> = Filter<D>>({
  className = '',
  scrollList = true,
  children,
  title,
  header,
  Layout,
  ...rest
}: ScrollListPageProps<D, F>) => (
  <div className={`container mx-auto max-w-(--breakpoint-xl) px-4 pt-16 pb-6 ${className}`}>
    <PageHead title={title} />
    <h1 className="my-8 text-4xl">{header}</h1>

    {scrollList ? (
      <ScrollList
        translator={i18n}
        renderList={allItems => <Layout defaultData={allItems} />}
        {...rest}
      />
    ) : (
      children
    )}
  </div>
);
