import { ClipboardEvent, Component, DragEvent, HTMLAttributes, PropsWithChildren } from 'react';
import { groupBy } from 'web-utility';

export interface PasteDropData {
  kind: string;
  type: string;
  data: string | File;
}

export interface PasteDropEvent extends Record<
  `${'kind' | 'type'}Map`,
  Record<string, PasteDropData[]>
> {
  type: string;
}

export interface PasteDropBoxProps extends Omit<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
  'onChange' | 'onDragOver' | 'onDrop' | 'onPaste'
> {
  onChange?: (event: PasteDropEvent) => void;
}

export class PasteDropBox extends Component<PasteDropBoxProps> {
  static async *transferData(items: DataTransferItemList) {
    for (const item of items) {
      const { kind, type } = item;

      if (kind === 'file') {
        const data = item.getAsFile();

        if (data) yield { kind, type, data };
      } else if (kind === 'string') {
        const data = await new Promise<string>(resolve => item.getAsString(resolve));

        yield { kind, type, data };
      }
    }
  }
  handlePasteDrop = async (event: ClipboardEvent | DragEvent) => {
    event.preventDefault();

    const items =
      event.type === 'paste'
        ? (event as ClipboardEvent).clipboardData.items
        : (event as DragEvent).dataTransfer.items;

    const list = await Array.fromAsync(PasteDropBox.transferData(items));

    const kindMap = groupBy(list, 'kind'),
      typeMap = groupBy(list, 'type');

    this.props.onChange?.({ type: event.type, kindMap, typeMap });
  };

  render() {
    const { children, onChange, ...props } = this.props;

    return (
      <div
        {...props}
        onDragOver={event => event.preventDefault()}
        onDrop={this.handlePasteDrop}
        onPaste={this.handlePasteDrop}
      >
        {children}
      </div>
    );
  }
}
