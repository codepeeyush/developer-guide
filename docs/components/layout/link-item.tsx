'use client';
import type { ComponentProps, ReactNode } from 'react';
import { usePathname } from 'fumadocs-core/framework';
import { isActive } from '@/lib/is-active';
import Link from 'fumadocs-core/link';

interface Filterable {
  on?: 'menu' | 'nav' | 'all';
}

interface WithHref {
  url: string;
  active?: 'url' | 'nested-url' | 'none';
  external?: boolean;
}

export interface MainItemType extends WithHref, Filterable {
  type?: 'main';
  icon?: ReactNode;
  text: ReactNode;
  description?: ReactNode;
}

export interface IconItemType extends WithHref, Filterable {
  type: 'icon';
  label?: string;
  icon: ReactNode;
  text: ReactNode;
  className?: string;
  secondary?: boolean;
}

export interface ButtonItemType extends WithHref, Filterable {
  type: 'button';
  icon?: ReactNode;
  text: ReactNode;
  secondary?: boolean;
}

export interface MenuItemType extends Partial<WithHref>, Filterable {
  type: 'menu';
  icon?: ReactNode;
  text: ReactNode;
  items: (
    | (MainItemType & {
        menu?: ComponentProps<'a'> & { banner?: ReactNode };
      })
    | CustomItemType
  )[];
  secondary?: boolean;
}

export interface CustomItemType extends Filterable {
  type: 'custom';
  secondary?: boolean;
  children: ReactNode;
}

export type LinkItemType =
  | MainItemType
  | IconItemType
  | ButtonItemType
  | MenuItemType
  | CustomItemType;

export function LinkItem({
  ref,
  item,
  ...props
}: Omit<ComponentProps<'a'>, 'href'> & { item: WithHref }) {
  const pathname = usePathname();
  const activeType = item.active ?? 'url';
  const active =
    activeType !== 'none' &&
    isActive(item.url, pathname, activeType === 'nested-url');

  return (
    <Link
      ref={ref}
      href={item.url}
      external={item.external}
      {...props}
      data-active={active}
    >
      {props.children}
    </Link>
  );
}
