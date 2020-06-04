import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Leaflet from 'leaflet';
import LeafletMarkerCluster from 'leaflet.markercluster';
//import 'react-leaflet-markercluster/dist/styles.min.css';
//import 'leaflet/dist/leaflet.css';

const randomStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

/**
 * Component to display a Map (using Leaflet library)
 */
export class Map extends Component {

    constructor(props) {
        super(props);
        this.leafletMarkers = []
    }

    componentDidMount() {
        const markerSvgIcon = '<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><defs><style>.cls-1{fill:#C32229;}</style></defs><title>map-marker</title><path class="cls-1" d="M172.27,501.67C27,291,0,269.41,0,192,0,86,86,0,192,0S384,86,384,192c0,77.41-27,99-172.27,309.67a24,24,0,0,1-39.46,0ZM192,272a80,80,0,1,0-80-80A80,80,0,0,0,192,272Z"/></svg>';
        const markerSvgIconUrl = encodeURI("data:image/svg+xml," + markerSvgIcon).replace('#','%23');
        const markerIcon = Leaflet.icon({
            iconUrl: markerSvgIconUrl,
            iconRetinaUrl: markerSvgIconUrl,
            iconSize: [30, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28]
        });

        const enableControls = this.props.enableControls;
        const mapOptions = {
            zoomControl: enableControls,
            doubleClickZoom: enableControls,
            keyboard: enableControls,
            scrollWheelZoom: enableControls,
            dragging: enableControls,
            boxZoom: enableControls,
            maxZoom: 18
        };
        const map = Leaflet.map(this.mountNode, mapOptions)
                           .setView(this.props.center, this.props.zoom);
        map.scrollWheelZoom.disable();

        // Markers
        let featureGroup;
        if (this.props.clusteredMarkers){
            featureGroup = new LeafletMarkerCluster.MarkerClusterGroup({
                maxClusterRadius: 40
            })
        } else {
            featureGroup = Leaflet.featureGroup([]);
        } 
        featureGroup.addTo(map);
        this.props.markers.forEach((marker, index) => {
            const leafletMarker = Leaflet.marker(marker.location, {title: marker.name, alt: marker.name, icon: markerIcon})
                   .bindPopup(marker.description)
                   .on('click', () => {
                        this.props.onMarkerClicked(index);
                    });
            leafletMarker.addTo(featureGroup);
            this.leafletMarkers.push(leafletMarker);
        });
        if (this.props.fitMarkersBounds) {
            map.fitBounds(featureGroup.getBounds());
        }

        // GeoJson
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let geoJsonLayerOptions = {
                style: {
                    fillColor: '#fc0d1a',
                    weight: 1,
                    opacity: 1,
                    color: '#fc0d1a',
                    fillOpacity: 0.2,
                }
            };
            const geoJsonAttribution = this.props.geoJsonAttribution;
            if (geoJsonAttribution) {
                geoJsonLayerOptions["attribution"] = geoJsonAttribution;
            }
            const geoJsonLayer = Leaflet.geoJSON(geoJson, geoJsonLayerOptions);
            geoJsonLayer.addTo(map);
            if (this.props.fitGeoJsonBounds) {
                map.fitBounds(geoJsonLayer.getBounds());
            }
        }

        Leaflet.tileLayer(
            this.props.tileLayerUrl,
            { attribution: this.props.tileLayerAttribution }
        ).addTo(map);

        this.mountNode.addEventListener('openMarkerPopup', (e) => {
            this.leafletMarkers[e.detail.index].openPopup();
        })
    }

    render() {
        return (
            <div id={this.props.id}
                 className={this.props.customClassName}
                 ref={ (node) => {this.mountNode = node} }>
            </div>
        );
    }
    
}

/**
 * Marker definition
 */
const MarkerShape = PropTypes.shape({
    /**
     * Marker location ([latitude, longitude])
     */
    location: PropTypes.arrayOf(PropTypes.number),
    /**
     * Marker name
     */
    name: PropTypes.string,
    /**
     * Marker description
     */
    description: PropTypes.string,
});

Map.propTypes = {
    /**
     * Container id in which map will be displayed
     */
    id: PropTypes.string,
    /**
     * Map center ([latitude, longitude] format)
     */
    center: PropTypes.arrayOf(PropTypes.number),
    /**
     * Map default zoom
     */
    zoom: PropTypes.number,
    /**
     * Enable/disable Map controls
     */
    enableControls: PropTypes.bool,
    /**
     * Tile Layer URL (see leaflet documentation)
     */
    tileLayerUrl: PropTypes.string,
    /**
     * Tile Layer attribution
     */
    tileLayerAttribution: PropTypes.string,
    /**
     * Map markers. A marker is definied by `location` ([lat, lon]), `name` (string) and `description` (string) fields
     */
    markers: PropTypes.arrayOf(MarkerShape),
    /**
     * Function called when a maker is clicked
     */
    onMarkerClicked: PropTypes.func,
    /**
     * Fits or not map according to markers bounds
     */
    fitMarkersBounds: PropTypes.bool,
    /**
     * GeoJSON to display on map
     */
    geoJson: PropTypes.object,
    /**
     * GeoJSON attribution
     */
    geoJsonAttribution: PropTypes.string,
    /**
     * Fits or not map according to geoJSON bounds
     */
    fitGeoJsonBounds: PropTypes.bool,
    /**
     * Map container class name
     */
    customClassName: PropTypes.string,
    /**
     * Enable/disable marker clustering
     */
    clusteredMarkers: PropTypes.bool
};

Map.defaultProps = {
    id: `mve-map-${randomStr}`,
    center: [46.85, 2.3518],
    zoom: 6,
    enableControls: true,
    tileLayerUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    tileLayerAttribution: "&copy; ESRI contributors",
    markers: [],
    onMarkerClicked: () => {},
    fitMarkersBounds: false,
    fitGeoJsonBounds: true,
    customClassName: "mve-map",
    clusteredMarkers: true
};