import type { Root } from 'mdast';
import { headingRange } from 'mdast-util-heading-range';

export default function detailsPlugin() {
  return function transformNode(tree: Root) {
    headingRange(tree, 'Table of Contents', (start, nodes, end) => {
      return [
        start,
        {
          type: 'paragraph',
          children: [
            { type: 'html', value: '<details>' },
            { type: 'html', value: '<summary>' },
            { type: 'html', value: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg> Table of Contents' },
            { type: 'html', value: '</summary>' }
          ]
        },
        ...nodes,
        {
          type: 'paragraph',
          children: [
            { type: 'html', value: '</details>' }
          ]
        },
        end
      ]
    })
  }
}