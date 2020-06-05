import React from 'react';
import { createJSXFromString } from './jsx'
import markdown from './jsx.md';

export default { 
    title: "🛠 Utils/JSX",
    parameters: {
      notes: { markdown },
    }
}

export const sample = () => createJSXFromString("<label>Label as String</label><ul><li>Item 1</li><li>Item 2</li></ul>", "root-class", "div")