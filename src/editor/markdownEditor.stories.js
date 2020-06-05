import React from 'react';
import { MarkdownEditor } from './markdownEditor.js';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number, optionsKnob as options } from "@storybook/addon-knobs";

export default { 
    title: "🛠 Components/MarkdownEditor",
    component: MarkdownEditor,
    decorators: [withKnobs]
}


export const empty = () => <MarkdownEditor />
empty.story = {
  name: 'Default',
  parameters: {
    docs: {
      storyDescription: 'MarkdownEditor par défaut.'
    }
  }
}

export const withInitialValue = () => {
    return <MarkdownEditor initialValue={"There is already content"}/>
}
withInitialValue.story = {
    parameters: {
      docs: {
        storyDescription: 'With a defined initial value'
      }
    }
}

export const withPlaceholder = () => {
    return <MarkdownEditor placeholder={"You can type something"}/>
}
withPlaceholder.story = {
    parameters: {
      docs: {
        storyDescription: 'With a defined placeholder'
      }
    }
}

export const withAllInitalProps = () => {

    const label = 'Toolbar items';
    const valuesObj = {
        heading: 'heading',
        bold: 'bold',
        italic: 'italic',
        strike: 'strike',
        divider: 'divider',
        quote: 'quote',
        divider: 'divider',
        ul: 'ul',
        ol: 'ol',
        task: 'task',
        indent: 'indent',
        outdent: 'outdent',
        divider: 'divider',
        table: 'table',
        link: 'link',
        divider: 'divider'
    };
    const defaultValue = ['heading', 'bold', 'italic'];
    const optionsObj = {
    display: 'multi-select'
    };

    const value = options(label, valuesObj, defaultValue, optionsObj);
    return <MarkdownEditor
        initialValue={"There is already content"}
        placeholder={"You can type something"}
        onBlur={action("OnBlur")}
        maxCharacters={200}
        toolbarItems={value}
    />
}
withAllInitalProps.story = {
  parameters: {
    docs: {
      storyDescription: 'With all initial props defined'
    }
  }
}

export const withoutRemainingCount = () => {

  const label = 'Toolbar items';
  const valuesObj = {
      heading: 'heading',
      bold: 'bold',
      italic: 'italic',
      strike: 'strike',
      divider: 'divider',
      quote: 'quote',
      divider: 'divider',
      ul: 'ul',
      ol: 'ol',
      task: 'task',
      indent: 'indent',
      outdent: 'outdent',
      divider: 'divider',
      table: 'table',
      link: 'link',
      divider: 'divider'
  };
  const defaultValue = ['heading', 'bold', 'italic'];
  const optionsObj = {
  display: 'multi-select'
  };

  const value = options(label, valuesObj, defaultValue, optionsObj);
  return <MarkdownEditor
      initialValue={"There is already content"}
      placeholder={"You can type something"}
      onBlur={action("OnBlur")}
      toolbarItems={value}
  />
}
withoutRemainingCount.story = {
parameters: {
  docs: {
    storyDescription: 'Without remaining count (maxCharacters is not defined)'
  }
}
}