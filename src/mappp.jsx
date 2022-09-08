import React, { useState, useMemo, useEffect } from "react";
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { data } from "./sample2.js";

import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";

const InfoBox = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  width: fit-constent;
  height: fit-content;
  background: red;
`;

const json = [
  {
    userId: "user-8dc9609fe3ea448886bc9d9472f06a57",
    clientId: "client-d56e7cc968dd4aa6b7af1952e9e381e9",
    senderId: "auth0-621e0ac1ab51d3006865bd40",
    createdAt: "2022-08-26T01:52:55.587Z",
  },
  {
    userId: "user-8dc9609fe3ea448886bc9d9472f06a57",
    clientId: "client-d56e7cc968dd4aa6b7af1952e9e381e9",
    senderId: "auth0-61e360d14bea9000763a0dc8",
    createdAt: "2022-08-17T09:29:15Z",
  },
  {
    userId: "user-8dc9609fe3ea448886bc9d9472f06a57",
    clientId: "client-d56e7cc968dd4aa6b7af1952e9e381e9",
    senderId: "auth0-61e360d14bea9000763a0dc8",
    createdAt: "2022-08-17T02:34:01Z",
  },
  {
    userId: "user-8dc9609fe3ea448886bc9d9472f06a57",
    clientId: "client-d56e7cc968dd4aa6b7af1952e9e381e9",
    senderId: "user-8dc9609fe3ea448886bc9d9472f06a57",
    createdAt: "2022-08-19T08:57:31.520Z",
  },
];

// const AIR_PORTS = "../public/sample.geojson";
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";
const INITIAL_VIEW_STATE = {
  controller: true,
  longitude: 140.384402,
  latitude: 35.764056,
  zoom: 3,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];
const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

// const AIR_PORTS = JSON.stringify(data);
const LATLNG_data = data.features.map((d) => [
  Number(d.geometry.coordinates[0]),
  Number(d.geometry.coordinates[1]),
]);
const RANK_data = data.features.map((d) => d.properties.scalerank);

const getTooltip = (d) => {
  //マウスホバー位置に地物が存在するかチェックする
  if (!d || !d.object) return null;
  let obj = d.object;

  //geojsonレイヤーの場合はpropertiesの値をobjに入れる
  if (d.object.properties) obj = d.object.properties;

  //データからtr要素を生成する
  const trs = Object.keys(obj)
    .filter((key) => obj[key]) //値がnullや""のプロパティは省く
    .map(
      (key) =>
        `<tr><th style="text-align:right">${key}</th><td>${obj[key]}</td></tr>`
    )
    .join("\n");

  //tooltip内に出力するhtml要素を生成する
  const html = ["<table>", trs, "</table>"].join("\n");

  return {
    // tooltip内に出力するhtml要素を渡す
    html: html,
    // tooltip内のhtmlに適用するstyleを設定する
    style: {
      fontSize: "0.5em",
    },
  };
};
export const Mappp = ({}) => {
  const [lineWidth, setLineWidth] = useState(1);

  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: data,
      filled: true,
      pointRadiusMinPixels: 2,
      opacity: 1,
      pointRadiusScale: 500,
      getRadius: (f) => (11 - f.properties.scalerank) * 100,
      getFillColor: [10, 0, 80, 100],

      pickable: true,
      autoHighlight: true,
    }),
    new ArcLayer({
      id: "arcs",
      data: data,
      dataTransform: (d) =>
        d.features.filter((f) => f.properties.scalerank < 9),
      getSourcePosition: (f) => [140.384402, 35.764056], // 成田
      getTargetPosition: (f) => f.geometry.coordinates,
      getSourceColor: [200, 128, 200],
      getTargetColor: [100, 0, 80],
      getWidth: 0.5,
      // greatCircle: true,
    }),
    new HexagonLayer({
      id: "airports",
      colorRange,
      coverage: 1,
      data: LATLNG_data,
      elevationRange: [0, 3000],
      elevationScale: LATLNG_data && RANK_data.length ? 500 : 0,
      extruded: true,
      getPosition: (d) => d,
      pickable: true,
      radius: 70000,
      upperPercentile: 100,
      material,
      // getElevationValue: RANK_data,

      transitions: {
        elevationScale: 3000,
      },
    }),
  ];
  console.log(layers);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "100vw",
          height: "100vh",
          background: "#fff",
        }}
      >
        <DeckGL
          layers={layers}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          getTooltip={getTooltip}
          effects={[lightingEffect]}
        >
          <Map reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
        </DeckGL>
      </div>
      <InfoBox>
        <input type={"number"} />
      </InfoBox>
    </>
  );
};
