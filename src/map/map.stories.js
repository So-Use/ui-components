import React from 'react';
import { Map } from './map.js';
import { action } from '@storybook/addon-actions';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';

export default { 
    title: "🛠 Components/Map",
    component: Map
}


export const empty = () => <Map id="map"/>
empty.story = {
  name: 'Default',
  parameters: {
    docs: {
      storyDescription: 'Map par défaut.'
    }
  }
}

export const withParisLatitudeLongitude = () => <Map id="map" center={[48.866667, 2.333333]}/>
withParisLatitudeLongitude.story = {
  parameters: {
    docs: {
      storyDescription: 'Map avec un centre défini.'
    }
  }
}


const niortLocation = [46.323716, -0.464777];
const mapMarkers = [
  {location: [46.3238382, -0.4670048], name: "Mairie de Niort", description: "<em>1 Place Martin Bastard, 79000 Niort</em>"},
  {location: [46.3299225, -0.4875651], name: "MAIF - Siège social", description: "<em>200 Avenue Salvador Allende, 79000 Niort</em>"},
  {location: [46.325827, -0.465872], name: "MAIF Assurances Niort", description: "<em>29 Rue Brisson, 79000 Niort</em>"},
];

export const withMarkers = () => <Map id="map" center={niortLocation} markers={mapMarkers} onMarkerClicked={action("MarkerClicked")}/>
withMarkers.story = {
  parameters: {
    docs: {
      storyDescription: 'Map avec des markers.'
    }
  }
}

export const withMarkersWithoutCluster = () => <Map id="map" center={niortLocation} markers={mapMarkers} onMarkerClicked={action("MarkerClicked")} clusteredMarkers={false}/>
withMarkersWithoutCluster.story = {
  parameters: {
    docs: {
      storyDescription: 'Map avec des markers qui ne sont pas regroupés en cluster.'
    }
  }
}