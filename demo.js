import React from 'react';
import ReactDOM from 'react-dom';

import { Autocomplete } from './src/autocomplete/autocomplete.js';
import { Map } from './src/map/map.js';
import { Table } from './src/table/table.js';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import './demo.scss'

const niortLocation = [46.323716, -0.464777];
const mapMarkers = [
  {location: [46.3238382, -0.4670048], name: "Mairie de Niort", description: "<em>1 Place Martin Bastard, 79000 Niort</em>"},
  {location: [46.3299225, -0.4875651], name: "MAIF - Siège social", description: "<em>200 Avenue Salvador Allende, 79000 Niort</em>"},
  {location: [46.325827, -0.465872], name: "MAIF Assurances Niort", description: "<em>29 Rue Brisson, 79000 Niort</em>"},
];
const nantesLocation = [47.218371, -1.553621];
import nantesGeoJson from './data/nantes.geo.json';

const data = [
  {
    firstname: "Amanda",
    lastname: "Buckland",
    age: 14
  },
  {
    firstname: "Dylan",
    lastname: "Roberts",
    age: 32
  },
  {
    firstname: "Abigail",
    lastname: "Forsyth",
    age: 28
  },
  {
    firstname: "Luke",
    lastname: "Burgess",
    age: 74
  },
  {
    firstname: "Sophie",
    lastname: "Payne",
    age: 61
  },
  {
    firstname: "Una",
    lastname: "McLean",
    age: 32
  },
  {
    firstname: "Julia",
    lastname: "Vaughan",
    age: 45
  },
  {
    firstname: "Dorothy",
    lastname: "Gray",
    age: 19
  },
  {
    firstname: "Owen",
    lastname: "Hardacre",
    age: 24
  },
  {
    firstname: "Alexandra",
    lastname: "Oliver",
    age: 38
  }
]

function Demo() {

  return (
    <div>
        <section className="autocomplete-section">
            <h2>Autocomplete</h2>
            <Autocomplete placeholder="Saisissez une adresse..."
                          debounce={250}
                          buildSuggestUrl={(q) => `https://api-adresse.data.gouv.fr/search/?q=${q}`}
                          transformSuggestResponse={(r) => r.features}
                          displaySuggestItem={(i) => i.properties.label}
                          displaySuggestionInInput={(item) => item.properties.label}
                          emptySuggestMessage="Aucune adresse trouvée :-("
                          onSuggestItemSelected={(i) => alert(i.properties.label)}
                          selectOnEnter={true} />
        </section>
        <section className="map-section">
            <h2>Map</h2>
            <h3>With Markers</h3>
            <Map center={niortLocation}
                 zoom={14}
                 markers={mapMarkers}
                 customClassName="markers-map"/>
            <h3>With GeoJson</h3>
            <Map center={nantesLocation}
                 zoom={12}
                 enableControls={false}
                 tileLayerUrl={"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"}
                 tileLayerAttribution={"&copy; <a href=\"https://carto.com/attributions\" target=\"_blank\" rel=\"noopener noreferrer\">CARTO</a>"}
                 geoJson={nantesGeoJson.contour}
                 geoJsonAttribution={"&copy; <a href=\"https://geo.api.gouv.fr/\" target=\"_blank\" rel=\"noopener noreferrer\">Geo API Gouv</a>"}
                 customClassName="geojson-map"/>
        </section>
        <section>
          <h2>Tables</h2>
          <h3>Simple table</h3>
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
        </section>
    </div>
  );

}
ReactDOM.render(<Demo /> , document.getElementById('demo'));