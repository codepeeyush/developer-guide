import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';

function Table({ children, ...props }: ComponentProps<'table'>) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
      <table {...props} className="w-full text-sm ">
        {children}
      </table>
    </div>
  );
}

function Thead({ children, ...props }: ComponentProps<'thead'>) {
  return (
    <thead {...props} className="bg-fd-muted/50">
      {children}
    </thead>
  );
}

function Th({ children, ...props }: ComponentProps<'th'>) {
  return (
    <th
      {...props}
      className="px-4 py-3 text-left text-xs font-medium text-fd-muted-foreground tracking-wide border-b border-fd-border"
    >
      {children}
    </th>
  );
}

function Tr({ children, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      {...props}
      className="border-t border-fd-border first:border-t-0 hover:bg-fd-accent/40 transition-colors duration-100"
    >
      {children}
    </tr>
  );
}

function Td({ children, ...props }: ComponentProps<'td'>) {
  return (
    <td {...props} className="px-4 py-3 text-fd-foreground">
      {children}
    </td>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    Accordions,
    Accordion,
    table: Table,
    thead: Thead,
    th: Th,
    tr: Tr,
    td: Td,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
