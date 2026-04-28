'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkSquare01Icon, ArrowUpDownIcon } from '@hugeicons/core-free-icons';
import { type ComponentProps, type ReactNode, useMemo, useState } from 'react';
import Link from 'fumadocs-core/link';
import { usePathname } from 'fumadocs-core/framework';
import { cn } from '@/lib/cn';
import { isTabActive } from '@/lib/is-active';
import { useSidebar } from '../base';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { SidebarTab } from './index';

export interface SidebarTabWithProps extends SidebarTab {
  props?: ComponentProps<'a'>;
}

export function SidebarTabsDropdown({
  options,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  options: SidebarTabWithProps[];
} & ComponentProps<'button'>) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();

  const selected = useMemo(() => {
    return options.findLast((item) => isTabActive(item, pathname));
  }, [options, pathname]);

  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };

  const item = selected ? (
    <>
      <div className="size-6 shrink-0 empty:hidden">
        {selected.icon}
      </div>
      <div>
        <p className="text-xs font-medium">{selected.title}</p>
        <p className="text-xs text-fd-muted-foreground empty:hidden md:hidden">
          {selected.description}
        </p>
      </div>
    </>
  ) : (
    placeholder
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            'flex items-center justify-center rounded-sm gap-2  p-2 border bg-fd-muted text-start text-fd-foreground transition-colors hover:bg-fd-secondary/5 data-[state=open]:bg-fd-secondary/5 data-[state=open]:text-fd-muted-foreground hover:cursor-pointer',
            props.className,
          )}
        >
          {item}
          <HugeiconsIcon icon={ArrowUpDownIcon} className="shrink-0 ms-auto size-4 text-fd-muted-foreground" />
        </PopoverTrigger>
      )}
      <PopoverContent className="flex flex-col gap-1 w-(--radix-popover-trigger-width) p-1 fd-scroll-container">
        {options.map((item) => {
          const isActive = selected && item.url === selected.url;
          if (!isActive && item.unlisted) return;

          return (
            <Link
              key={item.url}
              href={item.url}
              onClick={onClick}
              {...item.props}
              className={cn(
                'flex items-center gap-2 rounded-sm p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground',
                item.props?.className,
              )
          }
            >
              <div className="shrink-0 size-6 empty:hidden">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-medium">{item.title}</p>
                <p className="text-xs text-fd-muted-foreground empty:hidden">
                  {item.description}
                </p>
              </div>

              <HugeiconsIcon
                icon={CheckmarkSquare01Icon}
                className={cn(
                  'shrink-0 ms-auto size-3.5 text-fd-primary',
                  !isActive && 'invisible',
                )}
              />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
