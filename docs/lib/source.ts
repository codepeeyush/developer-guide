import { docs } from 'collections/server';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import * as HugeIcons from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createElement } from 'react';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

function hugeiconsPlugin(): LoaderPlugin {
  function resolve<T extends { icon?: unknown }>(node: T): T {
    if (typeof node.icon === 'string') {
      const icon = (HugeIcons as Record<string, unknown>)[node.icon];
      if (icon) node.icon = createElement(HugeiconsIcon, { icon: icon as never, className: 'size-4' });
    }
    return node;
  }
  return {
    name: 'hugeicons',
    transformPageTree: { file: resolve, folder: resolve, separator: resolve },
  };
}

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [hugeiconsPlugin()],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
