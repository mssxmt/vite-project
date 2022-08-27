import * as React from 'react';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

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
          <div style={{ height: "100vh", width: "100%" }} ref={mapContainer} />
        </>
      );
    };

export default ReactMapGl;