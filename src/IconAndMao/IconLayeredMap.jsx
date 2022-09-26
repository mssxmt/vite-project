import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { IconLayers } from "./IconLayers";
import { LinearInterpolator } from "@deck.gl/core";

import { JSONLoader } from "@loaders.gl/json";
import { load } from "@loaders.gl/core";
const icon_option = "./point.geojson";
import { pointData } from "./point2";
import { useCallback } from "react";

const INITIAL_VIEW_STATE = {
  latitude: 40.7368521,
  longitude: -73.9936065,
  zoom: 11,
  pitch: 60,
  bearing: 0,
};
const transitionInterpolator = new LinearInterpolator();
export const IconLayeredMap = () => {
  //geojsonを収める変数と、更新関数
  const [data, setData] = useState(0);
  //カメラの初期設定を行う
  const [viewState, setViewState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    // width: "500px",
    // height: "500px",
    longitude: 139.28610028247186,
    latitude: 35.7224770714194,
    zoom: 18,
    pitch: 60,
    maxZoom: 30,
    bearing: 0,
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

  const rotateCamera = useCallback(() => {
    setViewState((v) => ({
      ...v,
      bearing: v.bearing + 1,
      transitionDuration: 1,
      transitionInterpolator,
      onTransitionEnd: rotateCamera,
    }));
  }, []);
  //レンダリング
  return (
    <div>
      <DeckGL
        layers={IconLayers({ data })}
        controller={{ type: MapController }}
        // initialViewState={viewState}
        // controller={true}
        viewState={viewState}
        // layers={layers}
        // getTooltip={getTooltip}
        onLoad={rotateCamera}
        onViewStateChange={(v) => setViewState(v.viewState)}
      />
      <div style={{ position: "absolute", bottom: "0", right: "0" }}>
        <a
          href="http://www.openstreetmap.org/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
};
