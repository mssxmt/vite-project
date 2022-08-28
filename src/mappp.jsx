import React, { useState, useMemo } from "react";
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";

const AIR_PORTS = "../public/sample.geojson";

const INITIAL_VIEW_STATE = {
  controller: true,
  longitude: 140.384402,
  latitude: 35.764056,
  zoom: 3,
  maxZoom: 15,
  pitch: 30,
  bearing: 30,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

function getTooltip({ object }) {
  return object && object.properties.name;
}

export const Mappp = ({ mapStyle = MAP_STYLE }) => {
  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      opacity: 1,
      pointRadiusScale: 1000,
      getRadius: (f) => (11 - f.properties.scalerank) * 10,
      getFillColor: [10, 0, 80, 100],

      pickable: true,
      autoHighlight: true,
    }),
    new ArcLayer({
      id: "arcs",
      data: AIR_PORTS,
      dataTransform: (d) =>
        d.features.filter((f) => f.properties.scalerank < 4),
      getSourcePosition: (f) => [140.384402, 35.764056], // 成田
      getTargetPosition: (f) => f.geometry.coordinates,
      getSourceColor: [200, 128, 200],
      getTargetColor: [100, 0, 80],
      getWidth: 2.5,
      // greatCircle: true,
    }),
  ];
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <Map reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
};
