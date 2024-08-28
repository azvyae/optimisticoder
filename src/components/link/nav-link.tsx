'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useState,
  type HTMLAttributeAnchorTarget,
  type PropsWithChildren,
} from 'react';
type NavLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
  title?: string;
  target?: HTMLAttributeAnchorTarget;
};
function NavLink({
  children,
  activeClassName,
  className,
  title,
  target,
  ...props
}: PropsWithChildren<NavLinkProps>) {
  const pathname = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    const linkPathname = new URL(
      (props.as || props.href) as string,
      location.href,
    ).pathname;

    const newClassName =
      linkPathname === pathname
        ? `${className} ${activeClassName}`.trim()
        : className;

    if (newClassName !== computedClassName) {
      setComputedClassName(newClassName);
    }
  }, [
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
    pathname,
  ]);

  return (
    <Link
      target={target}
      title={title}
      className={computedClassName}
      {...props}
    >
      {children}
    </Link>
  );
}

export { NavLink };
