import { ComponentProps, FC } from 'react';

import { SymbolIcon } from './Icon';

export interface FilePreviewProps extends Omit<ComponentProps<'figure'>, 'children'> {
  path: string;
  type?: ComponentProps<'input'>['accept'];
}

const ExtensionNameMap: Record<string, string> = {
  stream: 'binary',
  compressed: 'zip',
  msword: 'doc',
  document: 'docx',
  powerpoint: 'ppt',
  presentation: 'pptx',
  excel: 'xls',
  sheet: 'xlsx',
};

const ImageExtension = /\.(apng|avif|bmp|gif|ico|jpe?g|png|svg|webp)$/i;
const AudioExtension = /\.(aac|flac|m4a|mp3|ogg|wav|weba)$/i;
const VideoExtension = /\.(avi|m4v|mov|mp4|mpeg|mpg|webm|wmv)$/i;

function inferFileMeta(path: string, type?: string) {
  const [pathname] = path.split(/[?#]/),
    [category = '', ...kind] = type?.split(/\W+/) || [];

  const fileName = decodeURI(pathname.split('/').at(-1) || pathname);
  const extension =
    kind[0] === '*' || !kind[0]
      ? fileName.includes('.')
        ? fileName.split('.').at(-1)?.toLowerCase()
        : ''
      : (ExtensionNameMap[kind.at(-1)!] || kind.at(-1))?.toLowerCase();

  const isImage = category === 'image' || (!category && ImageExtension.test(pathname));
  const isAudio = category === 'audio' || (!category && AudioExtension.test(pathname));
  const isVideo = category === 'video' || (!category && VideoExtension.test(pathname));

  return { fileName, extension, isImage, isAudio, isVideo };
}

export const FilePreview: FC<FilePreviewProps> = ({ path, type, className = '' }) => {
  const { fileName, extension, isImage, isAudio, isVideo } = inferFileMeta(path, type);
  const caption = fileName || extension || path;

  return (
    <figure className={`m-0 ${className}`}>
      {isImage ? (
        <img
          className="max-h-60 max-w-full rounded object-contain"
          loading="lazy"
          src={path}
          alt={fileName}
        />
      ) : isAudio ? (
        <audio className="max-w-full" controls preload="metadata" src={path} />
      ) : isVideo ? (
        <video className="max-h-72 max-w-full rounded" controls preload="metadata" src={path} />
      ) : null}

      <figcaption className="mt-0.5 max-w-full truncate align-middle text-[0.75rem] text-inherit opacity-80">
        {isImage || isAudio || isVideo ? (
          caption
        ) : (
          <a
            className="inline-flex max-w-full items-center gap-1 text-inherit underline"
            href={path}
            target="_blank"
            rel="noreferrer"
            download={fileName}
          >
            <SymbolIcon name="insert_drive_file" className="text-[1.25rem]" />
            {caption}
          </a>
        )}
      </figcaption>
    </figure>
  );
};

FilePreview.displayName = 'FilePreview';
