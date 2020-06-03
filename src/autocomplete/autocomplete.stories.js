import React from 'react';
import { Autocomplete } from './autocomplete.js';
import { action } from '@storybook/addon-actions';


export default { 
    title: "🛠 Components/Autocomplete",
    component: Autocomplete
}

// A `primary` button is used for emphasis.
export const suggestCity = () => <Autocomplete 
                                    placeholder="Saisissez une adresse..."
                                    debounce={250}
                                    buildSuggestUrl={(q) => `https://api-adresse.data.gouv.fr/search/?q=${q}`}
                                    transformSuggestResponse={(r) => r.features}
                                    displaySuggestItem={(i) => i.properties.label}
                                    displaySuggestionInInput={(item) => item.properties.label}
                                    emptySuggestMessage="Aucune adresse trouvée :-("
                                    onSuggestItemSelected={action('suggested item selected')}
                                    selectOnEnter={true}
                                />

suggestCity.story = {
    parameters: { 
        docs: {
        storyDescription: "Use `Autocomplete` to build an address autocomplete.",
        },
    },
};