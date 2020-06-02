import React, { Component } from 'react';
import PropTypes from 'prop-types';

import autocomplete from 'autocomplete.js';

import './autocomplete.scss';

const randomStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

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
    placeholder: PropTypes.string,
    debounce: PropTypes.number,
    buildSuggestUrl: PropTypes.func.isRequired,
    transformSuggestResponse: PropTypes.func,
    displaySuggestItem: PropTypes.func,
    displaySuggestionInInput: PropTypes.func,
    emptySuggestMessage: PropTypes.string,
    onSuggestItemSelected: PropTypes.func,
    selectOnEnter: PropTypes.bool,
    customClassName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
    initialValue: PropTypes.string,
    onKeyDown: PropTypes.func,
    onAutocompleteOpened: PropTypes.func
};

Autocomplete.defaultProps = {
    placeholder: "Saisissez du texte...",
    debounce: 0,
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
