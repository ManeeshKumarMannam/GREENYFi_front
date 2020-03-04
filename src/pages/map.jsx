import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


const MapStyles = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#e5e5e5" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#dadada" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{ "color": "#e5e5e5" }]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#c9c9c9" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    }
];


const Map = compose(withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB6d8OKRmld41gPMawF6mmJQYflu_4NRKo&libraries=places,geometry&language=en",
    //new modification"
    // googleMapURL: "https://maps.google.com/maps/api/js?key=AIzaSyBfflMRq3rMnOak2b2Xwrluc4WU0TeibLk&libraries=places&language=en-US",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}),
    lifecycle({
        componentWillMount() {
            const refs = {}
            this.setState({
                position: null, onMarkerMounted: ref => { refs.marker = ref; }, onPositionChanged: () => {
                    const position = refs.marker.getPosition();
                    this.props.getCoordinates(position)
                    // console.log("coordinates", this.props.getCoordinates(position));
                }
            })
        }
    }),
    withScriptjs, withGoogleMap)((props) => {
        console.log("propsdd", props)
        return (
            <div >
                {
                    props &&
                    < GoogleMap
                        defaultZoom={18}
                        // center={this.state.center}
                        // defaultOptions={{ styles: MapStyles }}
                        center={{
                            lat: parseFloat(props && props.lat) ? parseFloat(props && props.lat) : 23.033863,
                            lng: parseFloat(props && props.lng) ? parseFloat(props && props.lng) : 55.030603
                        }}
                        defaultCenter={{ lat: parseFloat(props && props.lat), lng: parseFloat(props && props.lng) }}
                        onZoomChanged={props.onZoomChanged}
                        onChange={(events) => console.log("changemarkers", events)}
                    >
                        <MarkerClusterer
                            averageCenter
                            enableRetinaIcons
                            gridSize={60}>
                            {
                                props.isMarkerShown && <Marker ref={props.onMarkerMounted}
                                    position={{
                                        lat: parseFloat(props && props.lat) ? parseFloat(props && props.lat) : 23.033863,
                                        lng: parseFloat(props && props.lng) ? parseFloat(props && props.lng) : 55.030603
                                    }}
                                    icon={{
                                        url: "https://cdn2.iconfinder.com/data/icons/departments/100/icon_department-maps-pin-512.png",
                                        size: { height: 80, width: 80 },
                                        scaledSize: { height: 80, width: 80 },
                                        // fixedRotation: true,
                                        anchor: { x: 40, y: 40 }
                                    }}
                                    draggable={false}
                                    isMarkerShown={true}
                                    onPositionChanged={props.onPositionChanged}
                                    zoom={40}
                                />
                            }
                        </MarkerClusterer>
                    </GoogleMap >
                }
            </div >

        )
    }

    )
export default Map;
