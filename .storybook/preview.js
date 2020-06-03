import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);


const viewports = {};
Array
  .from(new Array(10))
  .map((_, i) => {
    const w = 350 + i * 100;
    viewports['w' + w] = {
      type: 'desktop',
      name: w + 'px',
      styles: {
        width: w + 'px',
        height: '90%',
      },
    };
  });

// Use emojis to sort story categories/kinds
const EMOJI_SORT = ['📌', '🛠'];

addParameters({
  options: {
    showRoots: true,
    storySort: (a, b) => {
      if (a[1].kind !== b[1].kind) {
        const aEmojiKind = EMOJI_SORT.indexOf(a[1].kind.slice(0, 2)) + a[1].kind;
        const bEmojiKind = EMOJI_SORT.indexOf(b[1].kind.slice(0, 2)) + b[1].kind;
        return aEmojiKind.localeCompare(bEmojiKind, undefined, { numeric: true });
      }
      return -1;
    },
  },
  // a11y: false,
  // When enabled with live-reload, the scroll jumps a lot :-(
  a11y: {
    restoreScroll: true,
  },
  viewport: { viewports },
});