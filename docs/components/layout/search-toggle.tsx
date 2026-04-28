'use client';
import type { ComponentProps } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { cn } from '@/lib/cn';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';

interface SearchToggleProps
  extends Omit<ComponentProps<'button'>, 'color'>, ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  hideIfDisabled,
  size = 'icon-sm',
  color = 'ghost',
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      className={cn(buttonVariants({ size, color }), props.className)}
      data-search=""
      aria-label="Open Search"
      onClick={() => { setOpenSearch(true); }}
    >
      <HugeiconsIcon icon={Search01Icon} />
    </button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<'button'> & { hideIfDisabled?: boolean }) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border bg-fd-muted p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground hover:cursor-pointer',
        props.className,
      )}
      onClick={() => { setOpenSearch(true); }}
    >
      <HugeiconsIcon icon={Search01Icon} className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd key={i} className="rounded-md border bg-fd-background px-1.5">
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
