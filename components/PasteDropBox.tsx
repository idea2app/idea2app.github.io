import { ClipboardEvent, DragEvent, FC, PropsWithChildren } from 'react';

export interface PasteDropBoxProps {
  className?: string;
  onText?: (text: string) => void;
  onHTML?: (html: string) => void;
  onFiles?: (files: File[]) => void;
}

export const PasteDropBox: FC<PropsWithChildren<PasteDropBoxProps>> = ({
  children,
  className,
  onFiles,
  onHTML,
  onText,
}) => {
  const handlePasteDrop = async (event: ClipboardEvent | DragEvent) => {
    const items =
      event.type === 'paste'
        ? [...(event as ClipboardEvent).clipboardData.items]
        : [...(event as DragEvent).dataTransfer.items];

    const files = items
      .filter(item => item.kind === 'file')
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (files.length > 0) {
      event.preventDefault();
      onFiles?.(files);

      return;
    }

    const htmlItem = items.find(({ type }) => type === 'text/html');
    const plainItem = items.find(({ type }) => type === 'text/plain');

    if (htmlItem && onHTML) {
      const html = await new Promise<string>(resolve => htmlItem.getAsString(resolve));

      event.preventDefault();
      onHTML(html);
    } else if (plainItem && onText) {
      const text = await new Promise<string>(resolve => plainItem.getAsString(resolve));

      event.preventDefault();
      onText(text);
    }
  };

  return (
    <div
      className={className}
      onDragOver={e => e.preventDefault()}
      onDrop={handlePasteDrop}
      onPaste={handlePasteDrop}
    >
      {children}
    </div>
  );
};
