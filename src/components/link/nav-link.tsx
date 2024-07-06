'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type PropsWithChildren } from 'react';
type NavLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
  title?: string;
};
function NavLink({
  children,
  activeClassName,
  className,
  title,
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
    <Link title={title} className={computedClassName} {...props}>
      {children}
    </Link>
  );
}

export { NavLink };
