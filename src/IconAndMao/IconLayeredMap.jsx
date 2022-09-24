import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { IconLayers } from "./IconLayers";

import { JSONLoader } from "@loaders.gl/json";
import { load } from "@loaders.gl/core";
const icon_option = "./point.geojson";
import { pointData } from "./point";

// import "./styles.css";

export const IconLayeredMap = () => {
  //geojsonを収める変数と、更新関数
  const [data, setData] = useState(0);
  //カメラの初期設定を行う
  const [viewState, setViewState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: 135.0066832,
    latitude: 37.9619195,
    zoom: 4,
    maxZoom: 16,
  });
  console.log(pointData);
  //geojosnデータを読み込む
  useEffect(() => {
    const dataload = async () => {
      const res = await pointData;
      //data変数をupdate
      setData(pointData);
    };
    dataload();
  }, []);

  //レンダリング
  return (
    <div className="App">
      <DeckGL
        layers={IconLayers({ data })}
        controller={{ type: MapController }}
        initialViewState={viewState}
      />
      {/* <div className="attribution">
        <a
          href="http://www.openstreetmap.org/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap
        </a>
      </div> */}
    </div>
  );
};
