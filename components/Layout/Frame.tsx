import { DataObject, Filter, ListModel } from 'mobx-restful';
import { FC, ReactNode } from 'react';

import { i18n } from '../../models/Translation';
import { PageHead } from '../PageHead';
import { ScrollList } from '../ScrollList';

export interface FrameProps<D extends DataObject, F extends Filter<D> = Filter<D>> {
  store: ListModel<D, F>;
  filter?: F;
  defaultData?: D[];
  title: string;
  header: string;
  className?: string;
  scrollList?: boolean;
  children?: ReactNode;
  Layout: FC<{ defaultData: D[]; className?: string }>;
}

/**
 * @todo remove ScrollList and use children instead?
 */
export const Frame = <D extends DataObject, F extends Filter<D> = Filter<D>>({
  className = '',
  scrollList = true,
  children,
  title,
  header,
  Layout,
  ...rest
}: FrameProps<D, F>) => (
  <div className={`container mx-auto max-w-screen-xl px-4 pb-6 pt-16 ${className}`}>
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
