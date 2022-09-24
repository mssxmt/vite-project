import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer, ArcLayer, IconLayer } from "deck.gl";
import { pointData } from "../IconAndMao/point";
// const AIR_PORTS = "../public/sample.geojson";

export const GoogleMapWithLayers = ({ setPositionData }) => {
  const [pointer, setPointer] = useState("grab");
  const icon_option = {
    marker: {
      url: "./images/icon.png",
      x: 0, //画像読み込みのX軸オフセット
      y: 0, //画像読み込みのY軸オフセット
      anchorY: 512, //Y軸の表示位置（通常画像の縦幅に合わせる）
      width: 512, //アイコン画像の横幅
      height: 512, //アイコン画像の縦幅
      mask: true, //tureにするとアイコン画像の色の上塗りなどが可能になる
    },
    zombie: {
      url: "./images/1.png",
      x: 0, //画像読み込みのX軸オフセット
      y: 0, //画像読み込みのY軸オフセット
      anchorY: 512, //Y軸の表示位置（通常画像の縦幅に合わせる）
      width: 512, //アイコン画像の横幅
      height: 512, //アイコン画像の縦幅
      mask: true, //tureにするとアイコン画像の色の上塗りなどが可能になる
    },
  };
  const deckOverlay = new GoogleMapsOverlay({
    layers: [
      new IconLayer({
        id: "icon-layer",
        data: pointData.features,
        pickable: true,
        getIcon: (d) => {
          //属性値のtypeをみてアイコンを出し分ける
          return icon_option[d.properties.type];
        },
        sizeScale: 6, //アイコンのサイズはここで調整する
        getSize: 5, //個別にサイズを変化させたい場合はコールバックを設定する
        getColor: [0, 120, 0, 255], //マーカーカラーを上塗りする(mask有効時のみ)
        getPosition: (d) => d.geometry.coordinates,
        onHover: (d) => {
          if (d.object) {
            setPointer("pointer");
          } else {
            setPointer("grab");
          }
        },
        onClick: (d) => {
          setPositionData(d.object);
          //マーカークリック時の処理
          console.log(d.object);
        },
      }),
    ],
  });

  const defaultProps = {
    center: {
      lat: 35.71541548208645,
      lng: 139.76459856788452,
    },
    zoom: 5,
  };
  const getMapOptions = {
    // zoom: 16,
    // heading: 360,
    // tilt: 47.5,
    draggableCursor: pointer,
    mapId: "90f87356969d889c",
  };
  return (
    // Important! Always set the container height explicitly

    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={getMapOptions}
        onClick={(e) => console.log(e)}
        // onDragEnd={(e) => console.log(e)}
        onGoogleApiLoaded={({ map, maps }) => {
          //   setMapState(maps);
          deckOverlay.setMap(map);
          map.moveCamera({
            // center: new google.maps.LatLng(37.7893719, -122.3942),
            // zoom: 16,
            heading: 360,
            tilt: 47.5,
          });
        }}
      ></GoogleMapReact>
    </div>
  );
};
