import { storiesOf } from '@storybook/react';
import readme from '../README.md';
import { markdownToDom, markdownToReact } from './utils/markdown.js';

// TODO: It would be even better if we could load simple markdown files
export function createDocsStories (kind, stories) {
  Object.entries(stories).forEach(([name, markdownText]) => {
    storiesOf(kind + '/' + name)
      .addParameters({
        options: { showPanel: false },
      })
      .add('Page', () => markdownToDom(markdownText).element, {
        docsOnly: true,
        docs: {
          page: () => markdownToReact(markdownText),
        },
      });
  });
}

createDocsStories('📌  HOME', {
  //Changelog: changelog,
  //Contributing: contributing,
  // Small trick to put readme first ;-)
  ' Readme': readme,
  //Release: release,
});