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
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClickCapture = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target ||
      typeof href !== 'string' ||
      !href.startsWith('/')
    )
      return;

    const documentWithTransition = document as ViewTransitionDocument;

    if (!documentWithTransition.startViewTransition) return;

    const nextURL = new URL(href, location.href),
      currentURL = new URL(router.asPath, location.href);

    if (nextURL.pathname === currentURL.pathname && nextURL.search === currentURL.search)
      return;

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
      onClickCapture={handleClickCapture}
      {...props}
    >
      {props.children}
    </Link>
  );
}
