import React, {useState, useMemo} from 'react';
import {render} from 'react-dom';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {scaleQuantile} from 'd3-scale';
import 'mapbox-gl/dist/mapbox-gl.css';

const AIR_PORTS = "../public/sample.geojson"

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/arc/counties.json'; // eslint-disable-line

export const inFlowColors = [
  [255, 255, 204],
  [199, 233, 180],
  [127, 205, 187],
  [65, 182, 196],
  [29, 145, 192],
  [34, 94, 168],
  [12, 44, 132]
];

export const outFlowColors = [
  [255, 255, 178],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [177, 0, 38]
];

const INITIAL_VIEW_STATE = {
  longitude: -100,
  latitude: 40.7,
  zoom: 3,
  maxZoom: 15,
  pitch: 30,
  bearing: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

function calculateArcs(data, selectedCounty) {
  if (!data || !data.length) {
    return null;
  }
  if (!selectedCounty) {
    selectedCounty = data.find(f => f.properties.name === 'Los Angeles, CA');
  }
  const {flows, centroid} = selectedCounty.properties;

  const arcs = Object.keys(flows).map(toId => {
    const f = data[toId];
    return {
      source: centroid,
      target: f.properties.centroid,
      value: flows[toId]
    };
  });

  const scale = scaleQuantile()
    .domain(arcs.map(a => Math.abs(a.value)))
    .range(inFlowColors.map((c, i) => i));

  arcs.forEach(a => {
    a.gain = Math.sign(a.value);
    a.quantile = scale(Math.abs(a.value));
  });

  return arcs;
}

function getTooltip({object}) {
  return object && object.properties.name;
}

/* eslint-disable react/no-deprecated */
export default function Mappp({data, strokeWidth = 1, mapStyle = MAP_STYLE}) {
  const [selectedCounty, selectCounty] = useState(null);

  const arcs = useMemo(() => calculateArcs(data, selectedCounty), [data, selectedCounty]);

  const layers = [
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
    ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}

export function renderToDOM(container) {
  render(<Mappp />, container);

  fetch(DATA_URL)
    .then(response => response.json())
    .then(({features}) => {
      render(<Mappp data={features} />, container);
    });
}