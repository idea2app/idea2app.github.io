import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps, MouseEvent } from 'react';

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => Promise<unknown> | unknown) => void;
};

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({
  href,
  replace,
  scroll,
  shallow,
  locale,
  onClick,
  target,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target ||
      typeof href !== 'string' ||
      !href.startsWith('/')
    )
      return;

    const documentWithTransition = document as ViewTransitionDocument;

    if (!documentWithTransition.startViewTransition || href === router.asPath) return;

    event.preventDefault();

    const navigate = () =>
      replace
        ? router.replace(href, undefined, { scroll, shallow, locale })
        : router.push(href, undefined, { scroll, shallow, locale });

    documentWithTransition.startViewTransition(() => navigate());
  };

  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      target={target}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
