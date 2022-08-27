import React from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer, ArcLayer } from "deck.gl";

const AIR_PORTS = "../public/sample.geojson"

const AnyReactComponent = ({ text = "" }) => <div>{text}</div>;
// const AIR_PORTS = "../public/sample.geojson";
// const JsonAIR_PORTS = JSON.stringify(AIR_PORTS);
console.log(AIR_PORTS);

const deckOverlay = new GoogleMapsOverlay({
  layers: [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      opacity: 1,
      pointRadiusScale: 2000,
      getRadius: (f) => (11 - f.properties.scalerank) * 10,
      getFillColor: [10, 0, 80, 180],

      pickable: true,
      autoHighlight: true,
    }),
    new ArcLayer({
      id: "arcs",
      data: AIR_PORTS,
      dataTransform: (d) =>
        d.features.filter((f) => f.properties.scalerank < 40),
      getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
      getTargetPosition: (f) => f.geometry.coordinates,
      getSourceColor: [200, 128, 200],
      getTargetColor: [100, 0, 80],
      getWidth: 2.5,
      greatCircle: true,
    }),
  ],
});
export const GoogleMapDeck = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => {
          deckOverlay.setMap(map);
        }}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};
