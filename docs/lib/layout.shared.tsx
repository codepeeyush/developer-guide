import { HugeiconsIcon } from '@hugeicons/react';
import { RoboticIcon, AiProgrammingIcon, BashIcon } from '@hugeicons/core-free-icons';
import type { DocsLayoutProps } from '@/components/layout/notebook/index';
import type { SidebarTabWithProps } from '@/components/layout/sidebar/tabs/dropdown';
import { appName } from './shared';

export const widgetTabs: SidebarTabWithProps[] = [
  {
    title: 'Widget',
    description: 'Chatbot widget documentation',
    url: '/docs/widget',
    icon: <HugeiconsIcon icon={RoboticIcon} className="size-full" />,
  },
  {
    title: 'Dashboard',
    description: 'Dashboard documentation',
    url: '/docs/dashboard',
    icon: <HugeiconsIcon icon={AiProgrammingIcon} className="size-full" />,
  },
];

export function baseOptions(): Omit<DocsLayoutProps, 'tree' | 'children'> {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold text-sm">
          <HugeiconsIcon icon={BashIcon} className="size-5" />
          {appName}
        </span>
      ),
      url: '/docs/widget',
      mode: 'top',
    },
    sidebar: {
      tabs: widgetTabs,
    },
  };
}
