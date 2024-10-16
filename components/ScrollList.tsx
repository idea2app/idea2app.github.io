import { debounce } from 'lodash';
import { when } from 'mobx';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { DataObject, Filter, ListModel, Stream } from 'mobx-restful';
import { Component, ReactNode } from 'react';

import { EdgePosition, ScrollBoundary, ScrollBoundaryProps } from './ScrollBoundary';

export interface ScrollListProps<D extends DataObject, F extends Filter<D> = Filter<D>>
  extends Pick<ScrollBoundaryProps, 'className'> {
  translator: TranslationModel<string, 'load_more' | 'no_more'>;
  store: ListModel<D, F>;
  filter?: F;
  defaultData?: D[];
  renderList(allItems: D[]): ReactNode;
}

@observer
export class ScrollList<
  D extends DataObject = DataObject,
  F extends Filter<D> = Filter<D>
> extends Component<ScrollListProps<D, F>> {
  componentDidMount() {
    void this.init();
  }

  async init() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const BaseStream = Stream<DataObject>,
      { filter, defaultData } = this.props;

    const store = this.props.store as unknown as InstanceType<ReturnType<typeof BaseStream>>;

    await when(() => store.downloading < 1);

    store.clear();

    if (defaultData) await store.restoreList({ allItems: defaultData, filter });

    await store.getList(filter, store.pageList.length + 1);
  }

  componentWillUnmount() {
    this.props.store.clear();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  loadMore = debounce((edge: EdgePosition) => {
    const { store } = this.props;

    if (edge === 'bottom' && store.downloading < 1 && !store.noMore) void store.getList();
  });

  render() {
    const { className, translator, store, renderList } = this.props;
    const { t } = translator,
      { noMore, allItems } = store;

    return (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <ScrollBoundary className={className} onTouch={this.loadMore}>
        <div>
          {renderList(allItems)}

          <footer style={{ marginTop: '1.5rem' }}>
            {noMore || !allItems.length ? t('no_more') : t('load_more')}
          </footer>
        </div>
      </ScrollBoundary>
    );
  }
}
