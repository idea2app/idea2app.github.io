import {
  ComponentProps,
  CSSProperties,
  ElementType,
  FC,
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const cx = (...list: (string | undefined | false)[]) => list.filter(Boolean).join(' ');

const modeContext = createContext<{
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}>({ mode: 'light', setMode: () => undefined });

export interface Theme {
  breakpoints: { down: (key: 'sm' | 'md' | 'lg' | 'xl') => string };
}

export const createTheme = (theme: unknown) => theme;

export const ThemeProvider: FC<
  PropsWithChildren<{
    theme?: unknown;
    defaultMode?: 'light' | 'dark' | 'system';
    disableTransitionOnChange?: boolean;
  }>
> = ({ children, defaultMode = 'system' }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    const stored = window.localStorage.getItem('color-mode');

    if (stored === 'light' || stored === 'dark') return stored;

    if (defaultMode === 'light' || defaultMode === 'dark') return defaultMode;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    window.localStorage.setItem('color-mode', mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <modeContext.Provider value={value}>{children}</modeContext.Provider>;
};

export const useTheme = (): Theme => ({
  breakpoints: {
    down: key =>
      ({ sm: '(max-width: 599px)', md: '(max-width: 899px)', lg: '(max-width: 1199px)', xl: '(max-width: 1535px)' })[key],
  },
});

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);

    handler();
    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

export const StyledEngineProvider: FC<PropsWithChildren<{ injectFirst?: boolean }>> = ({ children }) => (
  <>{children}</>
);

export const GlobalStyles: FC<{ styles: string }> = () => null;

type GenericProps<T extends ElementType> = {
  component?: T;
  className?: string;
} & Omit<ComponentProps<T>, 'className' | 'component'>;

function renderByComponent<T extends ElementType = 'div'>(
  defaultTag: T,
  props: GenericProps<T>,
  extraClass?: string,
  children?: ReactNode,
) {
  const { component, className, ...rest } = props as GenericProps<ElementType>;
  const Tag = (component || defaultTag) as ElementType;

  return (
    <Tag className={cx(extraClass, className)} {...rest}>
      {children}
    </Tag>
  );
}

export type ContainerProps = HTMLAttributes<HTMLDivElement> & { maxWidth?: 'md' | 'lg' | 'xl' | false };
export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  maxWidth = 'lg',
  className,
  children,
  ...props
}) => {
  const widthClass =
    maxWidth === 'xl'
      ? 'max-w-screen-xl'
      : maxWidth === 'md'
        ? 'max-w-screen-md'
        : maxWidth === false
          ? ''
          : 'max-w-screen-lg';

  return (
    <div className={cx('mx-auto w-full', widthClass, className)} {...props}>
      {children}
    </div>
  );
};

const buttonVariantClass = (variant?: string, color?: string) => {
  if (variant === 'contained') {
    if (color === 'success') return 'bg-green-600 text-white hover:bg-green-700';
    if (color === 'warning') return 'bg-amber-600 text-white hover:bg-amber-700';
    if (color === 'info') return 'bg-cyan-600 text-white hover:bg-cyan-700';

    return 'bg-blue-600 text-white hover:bg-blue-700';
  }

  if (variant === 'outlined') return 'border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900';

  return 'hover:bg-gray-100 dark:hover:bg-gray-800';
};

export interface ButtonProps extends GenericProps<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  href?: string;
  target?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  component,
  variant,
  color,
  size = 'medium',
  fullWidth,
  href,
  target,
  disabled,
  startIcon,
  className,
  children,
  ...props
}) => {
  const sizeClass = size === 'small' ? 'px-2 py-1 text-xs' : size === 'large' ? 'px-4 py-2.5 text-base' : 'px-3 py-2 text-sm';
  const common = cx(
    'inline-flex items-center justify-center gap-1 rounded-md transition disabled:pointer-events-none disabled:opacity-50',
    buttonVariantClass(variant, color),
    sizeClass,
    fullWidth && 'w-full',
    className,
  );

  if (component) {
    const Tag = component as ElementType;

    return (
      <Tag className={common} href={href} target={target} {...props}>
        {startIcon}
        {children}
      </Tag>
    );
  }

  if (href) {
    return (
      <a className={common} href={href} target={target} {...(props as ComponentProps<'a'>)}>
        {startIcon}
        {children}
      </a>
    );
  }

  return (
    <button className={common} disabled={disabled} {...props}>
      {startIcon}
      {children}
    </button>
  );
};

export interface IconButtonProps extends GenericProps<'button'> {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: string;
  disableRipple?: boolean;
}

export const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  component,
  size = 'medium',
  className,
  children,
  disabled,
  color: _color,
  disableRipple: _disableRipple,
  ...props
}) => {
  const Tag = (component || 'button') as ElementType;

  return (
    <Tag
      className={cx(
        'inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800',
        size === 'small' ? 'h-8 w-8' : size === 'large' ? 'h-11 w-11' : 'h-9 w-9',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Tag>
  );
};

export type CardProps = HTMLAttributes<HTMLDivElement> & { component?: ElementType };

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, className, ...props }) =>
  renderByComponent('div', props as GenericProps<'div'>, cx('rounded-xl border border-gray-200 dark:border-gray-700', className), children);

export const CardContent: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ className, ...props }) => (
  <div className={cx('p-4', className)} {...props} />
);

export const CardActions: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ className, ...props }) => (
  <div className={cx('flex items-center gap-2 p-4 pt-0', className)} {...props} />
);

export const Paper: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & { component?: ElementType }>> = ({ className, children, ...props }) =>
  renderByComponent('div', props as GenericProps<'div'>, cx('rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900', className), children);

const toStyle = (sx?: Record<string, unknown>): CSSProperties | undefined => {
  if (!sx) return;

  const style: CSSProperties = {};

  if (typeof sx.borderTop === 'string') style.borderTop = sx.borderTop;
  if (typeof sx.borderColor === 'string') style.borderColor = 'currentColor';
  if (typeof sx.fontSize === 'string') style.fontSize = sx.fontSize;
  if (typeof sx.display === 'string') style.display = sx.display;
  if (typeof sx.alignItems === 'string') style.alignItems = sx.alignItems;
  if (typeof sx.gap === 'number') style.gap = `${sx.gap * 0.25}rem`;
  if (typeof sx.flexDirection === 'string') style.flexDirection = sx.flexDirection as CSSProperties['flexDirection'];
  if (typeof sx.flexWrap === 'string') style.flexWrap = sx.flexWrap as CSSProperties['flexWrap'];

  return Object.keys(style).length ? style : undefined;
};

export const Box: FC<PropsWithChildren<{ component?: ElementType; className?: string; sx?: Record<string, unknown> } & Record<string, unknown>>> = ({
  component = 'div',
  className,
  sx,
  children,
  ...props
}) => {
  const Tag = component as ElementType;

  return (
    <Tag className={className} style={toStyle(sx)} {...props}>
      {children}
    </Tag>
  );
};

type GridSize = number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };

const spanClass = (size: GridSize | undefined) => {
  if (!size) return '';
  if (typeof size === 'number') return `col-span-${size}`;

  return cx(
    size.xs && `col-span-${size.xs}`,
    size.sm && `sm:col-span-${size.sm}`,
    size.md && `md:col-span-${size.md}`,
    size.lg && `lg:col-span-${size.lg}`,
    size.xl && `xl:col-span-${size.xl}`,
  );
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  size?: GridSize;
  spacing?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export const Grid: FC<PropsWithChildren<GridProps>> = ({
  container,
  size,
  spacing,
  className,
  children,
  ...props
}) => {
  const gap =
    typeof spacing === 'number'
      ? `gap-${spacing}`
      : spacing?.xs
        ? `gap-${spacing.xs}`
        : undefined;

  return (
    <div
      className={cx(container ? 'grid grid-cols-12' : '', gap, spanClass(size), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
  label?: ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  maxRows?: number;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
}

export const TextField: FC<TextFieldProps> = ({
  label,
  fullWidth,
  multiline,
  className,
  maxRows,
  size = 'medium',
  ...props
}) => {
  const inputClass = cx(
    'rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700',
    size === 'small' && 'py-1.5',
  );

  return (
    <label className={cx('flex flex-col gap-1', fullWidth && 'w-full', className)}>
      {label && <span className="text-sm">{label}</span>}
      {multiline ? (
        <textarea className={inputClass} rows={maxRows ? Math.min(maxRows, 4) : 3} {...(props as ComponentProps<'textarea'>)} />
      ) : (
        <input className={inputClass} {...props} />
      )}
    </label>
  );
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h3' | 'h5' | 'h6' | 'body2' | 'caption';
  component?: ElementType;
  color?: string;
  gutterBottom?: boolean;
  display?: string;
}

export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  variant = 'body2',
  component,
  className,
  gutterBottom,
  children,
  ...props
}) => {
  const Tag = (component || (variant.startsWith('h') ? variant : 'p')) as ElementType;
  const textClass =
    variant === 'h3'
      ? 'text-4xl font-bold'
      : variant === 'h5'
        ? 'text-2xl font-semibold'
        : variant === 'h6'
          ? 'text-lg font-semibold'
          : variant === 'caption'
            ? 'text-xs text-gray-500'
            : 'text-sm';

  return (
    <Tag className={cx(textClass, gutterBottom && 'mb-2', className)} {...props}>
      {children}
    </Tag>
  );
};

export interface ChipProps extends HTMLAttributes<HTMLElement> {
  label: ReactNode;
  component?: ElementType;
  clickable?: boolean;
}

export const Chip: FC<ChipProps> = ({ label, component = 'span', className, ...props }) => {
  const Tag = component as ElementType;

  return (
    <Tag
      className={cx(
        'inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-xs dark:border-gray-700',
        className,
      )}
      {...props}
    >
      {label}
    </Tag>
  );
};

export const Tooltip: FC<PropsWithChildren<{ title?: ReactNode }>> = ({ title, children }) => {
  if (!isValidElement(children)) return <>{children}</>;

  return cloneElement(children as ReactElement<{ title?: string }>, {
    title: typeof title === 'string' ? title : undefined,
  });
};

export const Alert: FC<PropsWithChildren<{ severity?: 'warning' | 'error' | 'success' | 'info' }>> = ({
  severity = 'info',
  children,
}) => {
  const color =
    severity === 'warning'
      ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
      : severity === 'error'
        ? 'border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200'
        : severity === 'success'
          ? 'border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200'
          : 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200';

  return <div className={cx('rounded-md border p-3 text-sm', color)}>{children}</div>;
};

export const Avatar: FC<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }) => (
  <img className={cx('h-8 w-8 rounded-full object-cover', className)} src={src || '/default-avatar.png'} alt={alt || ''} />
);

export const LinearProgress: FC = () => (
  <div className="h-1.5 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
    <div className="h-full w-1/3 animate-pulse bg-current" />
  </div>
);

export const CircularProgress: FC<{ size?: number }> = ({ size = 20 }) => (
  <span
    className="inline-block animate-spin rounded-full border-2 border-current border-r-transparent"
    style={{ width: size, height: size }}
  />
);

export const Link: FC<PropsWithChildren<ComponentProps<'a'>>> = ({ children, ...props }) => <a {...props}>{children}</a>;

export interface SvgIconProps extends HTMLAttributes<SVGSVGElement> {
  viewBox?: string;
}

export const SvgIcon: FC<PropsWithChildren<SvgIconProps>> = ({
  children,
  className,
  viewBox = '0 0 24 24',
  ...props
}) => (
  <svg
    className={cx('inline-block h-6 w-6 fill-current', className)}
    viewBox={viewBox}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const AppBar: FC<PropsWithChildren<HTMLAttributes<HTMLElement>>> = ({ className, ...props }) => (
  <header className={cx('w-full border-b bg-white/80 dark:bg-black/60', className)} {...props} />
);

export const Toolbar: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement> & { disableGutters?: boolean }>> = ({
  className,
  disableGutters,
  ...props
}) => <div className={cx('min-h-16 px-4', disableGutters && 'px-0', className)} {...props} />;

export interface PopoverProps {
  anchorEl?: HTMLElement | null;
}

export const Menu: FC<
  PropsWithChildren<{
    anchorEl?: HTMLElement | null;
    open?: boolean;
    onClose?: () => void;
    className?: string;
    id?: string;
    slotProps?: unknown;
  }>
> = ({ open, children, className }) =>
  open ? (
    <div className={cx('absolute right-0 z-50 mt-2 min-w-28 rounded-md border bg-white p-1 shadow dark:bg-gray-900', className)}>
      {children}
    </div>
  ) : null;

export const MenuItem: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement> & { selected?: boolean }>> = ({
  selected,
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    className={cx('block w-full rounded px-3 py-1 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800', selected && 'bg-gray-100 dark:bg-gray-800', className)}
    {...props}
  >
    {children}
  </button>
);

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  variant?: 'temporary' | 'permanent';
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  className?: string;
  slotProps?: { paper?: { className?: string } };
  ModalProps?: unknown;
  sx?: unknown;
}

export const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  children,
  variant = 'temporary',
  anchor = 'left',
  slotProps,
}) => {
  if (variant === 'permanent') {
    return <aside className={cx('w-[250px]', slotProps?.paper?.className)}>{children}</aside>;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20" />
      <aside
        className={cx(
          'absolute bg-white p-2 shadow-lg dark:bg-gray-900',
          anchor === 'top' ? 'inset-x-0 top-0' : 'bottom-0 left-0 top-0 w-[250px]',
          slotProps?.paper?.className,
        )}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  );
};

export const Modal: FC<PropsWithChildren<{ open: boolean }>> = ({ open, children }) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">{children}</div>
  ) : null;

export const Badge: FC<PropsWithChildren<{ badgeContent?: ReactNode; color?: string; className?: string }>> = ({
  badgeContent,
  className,
  children,
}) => (
  <span className={cx('relative inline-flex items-center gap-2', className)}>
    {children}
    <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-xs text-white">{badgeContent}</span>
  </span>
);

interface TabInternalProps {
  value?: string;
  selected?: boolean;
  onSelect?: (event: MouseEvent<HTMLButtonElement>, value?: string) => void;
}

export type TabProps = HTMLAttributes<HTMLButtonElement> & {
  label?: ReactNode;
  value?: string;
  component?: ElementType;
};

export const Tab: FC<TabProps & TabInternalProps> = ({
  label,
  value,
  selected,
  onSelect,
  className,
  ...props
}) => (
  <button
    type="button"
    className={cx('rounded-md px-3 py-1.5 text-sm', selected ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800', className)}
    onClick={event => onSelect?.(event, value)}
    {...props}
  >
    {label}
  </button>
);

export const Tabs: FC<
  PropsWithChildren<{
    value?: string;
    onChange?: (event: MouseEvent<HTMLButtonElement>, value: 'up' | 'in') => void;
    className?: string;
    variant?: 'fullWidth' | 'standard';
  }>
> = ({ value, onChange, children, className, variant }) => (
  <div className={cx('inline-grid gap-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800', variant === 'fullWidth' && 'grid-cols-2', className)}>
    {Array.from((children as ReactNode[] | undefined) || []).map((child, index) =>
      isValidElement(child)
        ? cloneElement(child as ReactElement<TabProps>, {
            selected: (child.props as TabProps).value === value,
            onSelect: (event: MouseEvent<HTMLButtonElement>, newValue?: string) =>
              onChange?.(event, (newValue || '') as 'up' | 'in'),
            key: (child as ReactElement).key || index,
          })
        : child,
    )}
  </div>
);
