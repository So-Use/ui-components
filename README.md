# ui-components
UI Components library 

## Install

```sh
yarn add https://github.com/So-Use/ui-components
```

## Usage 

### Autocomplete
```js
import { Autocomplete } from 'ui-components';
<Autocomplete 
    placeholder="Saisissez une adresse..."
    debounce={250}
    buildSuggestUrl={(q) => `https://api-adresse.data.gouv.fr/search/?q=${q}`}
    transformSuggestResponse={(r) => r.features}
    displaySuggestItem={(i) => i.properties.label}
    displaySuggestionInInput={(item) => item.properties.label}
    emptySuggestMessage="Aucune adresse trouvée :-("
    onSuggestItemSelected={(i) => alert(i.properties.label)}
    selectOnEnter={true}
/>
```

### Map

#### With markers

```js
import { Map } from 'ui-components';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';

const niortLocation = [46.323716, -0.464777];
const mapMarkers = [
  {location: [46.3238382, -0.4670048], name: "Mairie de Niort", description: "<em>1 Place Martin Bastard, 79000 Niort</em>"},
  {location: [46.3299225, -0.4875651], name: "MAIF - Siège social", description: "<em>200 Avenue Salvador Allende, 79000 Niort</em>"},
  {location: [46.325827, -0.465872], name: "MAIF Assurances Niort", description: "<em>29 Rue Brisson, 79000 Niort</em>"},
];

<Map
    center={niortLocation}
    zoom={14}
    markers={mapMarkers}
    customClassName="markers-map"
/>
```

#### With geoJSON

```js
import { Map } from 'ui-components';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import nantesGeoJson from './data/nantes.geo.json';
const nantesLocation = [47.218371, -1.553621];

<Map 
    center={nantesLocation}
    zoom={12}
    enableControls={false}
    tileLayerUrl={"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"}
    tileLayerAttribution={"&copy; <a href=\"https://carto.com/attributions\" target=\"_blank\" rel=\"noopener noreferrer\">CARTO</a>"}
    geoJson={nantesGeoJson.contour}
    geoJsonAttribution={"&copy; <a href=\"https://geo.api.gouv.fr/\" target=\"_blank\" rel=\"noopener noreferrer\">Geo API Gouv</a>"}
    customClassName="geojson-map"
/>
```

### Table

#### Simple table

```js
const data = [
  {
    firstname: "Amanda",
    lastname: "Buckland",
    age: 14
  },
  ...
  {
    firstname: "Alexandra",
    lastname: "Oliver",
    age: 38
  }
]

<Table
    columns={[
        {
            Header: 'Firstname',
            accessor: "firstname",
            sortByType: 'alphanumeric'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname',
            sortByType: 'alphanumeric'
        },
        {
            Header: 'Age',
            accessor: 'age',
            sortByType: 'basic'
        }
    ]}
    data={data}
/>
```

#### Paginated Table
```js

const resultsFromResponse = (response) => {
    const data = response.data;
    return Object.keys(data).map(countryCode => {
        return {
            countryCode,
            ...data[countryCode]
        }
    })
}

const totalFromResponse = (response) => {
    return response.total;
}

<PaginatedTable
    columns={[
        {
            Header: 'Country code',
            accessor: "countryCode"
        },
        {
            Header: 'Country',
            accessor: 'country'
        },
        {
            Header: 'Region',
            accessor: 'region'
        }
    ]}
    searchUrl={(query, limit, offset, sort) => `https://api.first.org/data/v1/countries?q=${query}&limit=${limit}&offset=${offset}`}
    resultsFromResponse={resultsFromResponse}
    totalFromResponse={totalFromResponse}
    filterable={true}
    pageSize={10}
/>
```