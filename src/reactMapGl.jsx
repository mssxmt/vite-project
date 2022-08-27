import * as React from 'react';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';

const AIR_PORTS = "../public/sample.geojson"

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

const ReactMapGl = () => {
    let map;
    const mapContainer = useRef(null);

    useEffect(() => {
    if (!map) {
        if (!mapContainer.current) return;

        map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
        });
    }

    map.addControl(new maplibregl.NavigationControl());
    }, []);
    
      return (
        <>
            <DeckGL
                layers={layers}
                // initialViewState={INITIAL_VIEW_STATE}
                // controller={true}
                // getTooltip={getTooltip}
                >
            </DeckGL>
                <div style={{ height: "100vh", width: "100%" }} ref={mapContainer} />
        </>
      );
    };

export default ReactMapGl;