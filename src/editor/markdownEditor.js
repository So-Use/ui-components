import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { remainingCharactersPlugin } from './tui/remainingCharactersPlugin.js'
import { Editor } from '@toast-ui/react-editor';

/**
 * Markdown editor built from tui-editor component
 */
export class MarkdownEditor extends Component {
    _editorRef = React.createRef();

    render() {
        return <Editor
            initialValue={this.props.initialValue}
            previewStyle="vertical"
            height="300px"
            initialEditType="wysiwyg"
            usageStatistics={false}
            maxLength={this.props.maxCharacters}
            toolbarItems={this.props.toolbarItems || [
                'heading',
                'bold',
                'italic',
                'strike',
                'divider',
                'quote',
                'divider',
                'ul',
                'ol',
                'task',
                'indent',
                'outdent',
                'divider',
                'table',
                'link',
                'divider'
            ]}
            hideModeSwitch={true}
            language={'fr'}
            placeholder={this.props.placeholder}
            plugins={this.props.maxCharacters ? [remainingCharactersPlugin] : null}
            onBlur={() => {
                this.props.onBlur(this._editorRef.current.getInstance().getMarkdown())
            }}
            ref={this._editorRef}
        />
    }
}

MarkdownEditor.propTypes = {
    /**
     * Initial value to display
     */
    initalValue: PropTypes.string,
    /**
     * Placeholder to display
     */
    placeholder: PropTypes.string,
    /**
     * Items in toolbar
     */
    toolbarItems: PropTypes.arrayOf(PropTypes.oneOf([
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'link',
        'divider'
    ])),
    /**
     * Max characters allowed
     */
    maxCharacters: PropTypes.number,
    /**
     * Action on onBlur event
     */
    onBlur: PropTypes.func
}

MarkdownEditor.defaultProps = {
    initalValue: "",
    placeholder: 'Saisissez votre texte',
    toolbarItems: [
        'heading',
        'bold',
        'italic',
        'strike',
        'divider',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'link',
        'divider'
    ],
    onBlur: () => {}
}