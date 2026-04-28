import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { PencilEdit01Icon, TextAlignLeftIcon } from '@hugeicons/core-free-icons';
import { I18nLabel } from 'fumadocs-ui/contexts/i18n';
import {
  type BreadcrumbProps,
  type FooterProps,
  PageBreadcrumb,
  PageFooter,
  PageTOCPopover,
  PageTOCPopoverContent,
  PageTOCPopoverTrigger,
} from './client';
import type { AnchorProviderProps, TOCItemType } from 'fumadocs-core/toc';
import * as TocDefault from '@/components/toc/default';
import * as TocClerk from '@/components/toc/clerk';
import { TOCProvider, TOCScrollArea } from '@/components/toc/index';

interface BreadcrumbOptions extends BreadcrumbProps {
  enabled: boolean;
  component: ReactNode;
}

interface FooterOptions extends FooterProps {
  enabled: boolean;
  component: ReactNode;
}

export interface DocsPageProps {
  toc?: TOCItemType[];
  tableOfContent?: Partial<TableOfContentOptions>;
  tableOfContentPopover?: Partial<TableOfContentPopoverOptions>;
  full?: boolean;
  breadcrumb?: Partial<BreadcrumbOptions>;
  footer?: Partial<FooterOptions>;
  children?: ReactNode;
}

type TableOfContentOptions = Pick<AnchorProviderProps, 'single'> & {
  header?: ReactNode;
  footer?: ReactNode;
  enabled: boolean;
  component: ReactNode;
  style?: 'normal' | 'clerk';
};

type TableOfContentPopoverOptions = Omit<TableOfContentOptions, 'single'>;

export function DocsPage({
  breadcrumb: {
    enabled: breadcrumbEnabled = true,
    component: breadcrumb,
    ...breadcrumbProps
  } = {},
  footer = {},
  full = false,
  tableOfContentPopover: {
    enabled: tocPopoverEnabled,
    component: tocPopover,
    ...tocPopoverOptions
  } = {},
  tableOfContent: {
    enabled: tocEnabled,
    component: tocReplace,
    ...tocOptions
  } = {},
  toc = [],
  children,
}: DocsPageProps) {
  tocEnabled ??=
    !full &&
    (toc.length > 0 ||
      tocOptions.footer !== undefined ||
      tocOptions.header !== undefined);

  tocPopoverEnabled ??=
    toc.length > 0 ||
    tocPopoverOptions.header !== undefined ||
    tocPopoverOptions.footer !== undefined;

  let wrapper = (children: ReactNode) => children;

  if (tocEnabled || tocPopoverEnabled) {
    wrapper = (children) => (
      <TOCProvider single={tocOptions.single} toc={toc}>
        {children}
      </TOCProvider>
    );
  }

  return wrapper(
    <>
      {tocPopoverEnabled &&
        (tocPopover ?? (
          <PageTOCPopover>
            <PageTOCPopoverTrigger />
            <PageTOCPopoverContent>
              {tocPopoverOptions.header}
              <TOCScrollArea>
                {tocPopoverOptions.style === 'clerk' ? (
                  <TocClerk.TOCItems />
                ) : (
                  <TocDefault.TOCItems />
                )}
              </TOCScrollArea>
              {tocPopoverOptions.footer}
            </PageTOCPopoverContent>
          </PageTOCPopover>
        ))}
      <article
        id="nd-page"
        data-full={full}
        className={cn(
          'flex flex-col [grid-area:main] px-4 py-6 gap-4 md:px-6 *:max-w-[900px]',
          full && '*:max-w-[1285px]',
        )}
      >
        {breadcrumbEnabled &&
          (breadcrumb ?? <PageBreadcrumb {...breadcrumbProps} />)}
        {children}
        {footer.enabled !== false &&
          (footer.component ?? <PageFooter items={footer.items} />)}
      </article>
      {tocEnabled &&
        (tocReplace ?? (
          <div
            id="nd-toc"
            className="sticky top-(--fd-docs-row-3) [grid-area:toc] h-[calc(var(--fd-docs-height)-var(--fd-docs-row-3))] flex flex-col w-(--fd-toc-width) pt-6 pe-4 pb-2 xl:layout:[--fd-toc-width:268px] max-xl:hidden"
          >
            {tocOptions.header}
            <h3
              id="toc-title"
              className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground"
            >
              <HugeiconsIcon icon={TextAlignLeftIcon} className="size-4" />
              <I18nLabel label="toc" />
            </h3>
            <TOCScrollArea>
              {tocOptions.style === 'clerk' ? (
                <TocClerk.TOCItems />
              ) : (
                <TocDefault.TOCItems />
              )}
            </TOCScrollArea>
            {tocOptions.footer}
          </div>
        ))}
    </>,
  );
}

export function EditOnGitHub(props: ComponentProps<'a'>) {
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      {...props}
      className={cn(
        buttonVariants({
          color: 'secondary',
          size: 'sm',
          className: 'gap-1.5 not-prose',
        }),
        props.className,
      )}
    >
      {props.children ?? (
        <>
          <HugeiconsIcon icon={PencilEdit01Icon} className="size-3.5" />
          <I18nLabel label="editOnGithub" />
        </>
      )}
    </a>
  );
}

export function DocsBody({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('prose flex-1', className)}>
      {children}
    </div>
  );
}

export function DocsDescription({
  children,
  className,
  ...props
}: ComponentProps<'p'>) {
  if (children === undefined) return null;

  return (
    <p
      {...props}
      className={cn('mb-8 text-lg text-fd-muted-foreground', className)}
    >
      {children}
    </p>
  );
}

export function DocsTitle({
  children,
  className,
  ...props
}: ComponentProps<'h1'>) {
  return (
    <h1 {...props} className={cn('text-[1.75em] font-semibold', className)}>
      {children}
    </h1>
  );
}

export { PageLastUpdate, PageBreadcrumb } from './client';
