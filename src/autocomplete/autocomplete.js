import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autocomplete from 'autocomplete.js';

import './autocomplete.scss';

const randomStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

/**
 *  Autocomplete component built with algolia autocomplete.js component
 */
export class Autocomplete extends Component {

    constructor(props) {
        super(props);
        this.state = { firstResult: null };
    }

    componentDidMount() {
        this._search = autocomplete(this.mountNode, { hint: false }, [
            {
                source: (query, callback) => {
                    fetch(this.props.buildSuggestUrl(query))
                            .then(res => res.json())
                            .then(response => {
                                const items = this.props.transformSuggestResponse(response);
                                if (this.props.selectOnEnter) {
                                    if (items && items.length > 0) {
                                        this.setState({
                                            firstResult: items[0]
                                        });
                                    } else {
                                        this.setState({
                                            firstResult: null
                                        });
                                    }
                                }
                                callback(items);
                            })
                },
                displayKey: this.props.displaySuggestionInInput,
                templates: {
                    suggestion: this.props.displaySuggestItem,
                    empty: `<div class="aa-suggestion aa-suggestion-empty">${this.props.emptySuggestMessage}</div>`
                },
                debounce: this.props.debounce
            }
        ]).on('autocomplete:selected', (event, suggestion, dataset, context) => { // eslint-disable-line no-unused-vars
            this.props.onSuggestItemSelected(suggestion)
        }).on('autocomplete:opened', () => {
            this.props.onAutocompleteOpened();
        });

        if (this.props.selectOnEnter) {
            this.mountNode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (this.state.firstResult) {
                        this.props.onSuggestItemSelected(this.state.firstResult);
                    }
                }
            });
            this.mountNode.addEventListener('keyup', (e) => {
                if (e.target.value.trim() === '') {
                    this.setState({
                        firstResult: null
                    });
                }
            });
        }
    }

    componentWillUnmount() {
        if (this._search) {
            this._search.autocomplete.destroy();
            this._search = undefined;
        }
    }
    

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <input id={this.props.id}
                   name={this.props.name}
                   title={this.props.title}
                   type="text"
                   className={this.props.customClassName}
                   ref={ (node) => {this.mountNode = node} }
                   placeholder={this.props.placeholder} 
                   defaultValue={this.props.initialValue}
                   required={this.props.required}
                   onKeyDown={(e) => this.props.onKeyDown(e)}/>
        );
    }
    
}

Autocomplete.propTypes = {
    /**
     * Placeholder displayed in input
     */
    placeholder: PropTypes.string,
    /**
     * Number of seconds to delay suggest url call between two user inputs.
     */
    debounce: PropTypes.number,
    /**
     * Function which return suggest url to call (take user query in parameter)
     */
    buildSuggestUrl: PropTypes.func.isRequired,
    /**
     * Function called to retrieved items to display from fetch response
     */
    transformSuggestResponse: PropTypes.func,
    /**
     * Function called to display item in suggestion
     */
    displaySuggestItem: PropTypes.func,
    /**
     * Function called to display item in input
     */
    displaySuggestionInInput: PropTypes.func,
    /**
     * Message displayed when there is no suggestions
     */
    emptySuggestMessage: PropTypes.string,
    /**
     * Action when user selects an item
     */
    onSuggestItemSelected: PropTypes.func,
    /**
     * Enable/disable validation when user clicks 'Enter' on input
     */
    selectOnEnter: PropTypes.bool,
    /**
     * Input class name
     */
    customClassName: PropTypes.string,
    /**
     * Input id
     */
    id: PropTypes.string,
    /**
     * Input name
     */
    name: PropTypes.string,
    /**
     * Input title
     */
    title: PropTypes.string,
    /**
     * Input is required or not
     */
    required: PropTypes.bool,
    /**
     * Input initial value
     */
    initialValue: PropTypes.string,
    /**
     * input keydown listener
     */
    onKeyDown: PropTypes.func,
    /**
     * Function called when autocomplete is opened
     */
    onAutocompleteOpened: PropTypes.func
};

Autocomplete.defaultProps = {
    placeholder: "Saisissez du texte...",
    debounce: 250,
    transformSuggestResponse: (x) => x,
    displaySuggestItem: (x) => x,
    displaySuggestionInInput: (x) => x,
    emptySuggestMessage: "Aucune suggestion",
    onSuggestItemSelected: (x) => { console.log(x) }, // eslint-disable-line no-console
    selectOnEnter: false,
    customClassName: "mve-autocomplete",
    id: `mve-autocomplete-${randomStr}`,
    name: `mve-autocomplete-${randomStr}`,
    title: undefined,
    required: false,
    initialValue: undefined,
    onKeyDown: () => {},
    onAutocompleteOpened: () => {}
};
