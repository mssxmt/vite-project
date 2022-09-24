import { TileLayer, BitmapLayer, IconLayer } from "deck.gl";
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
export const IconLayers = (props) => {
  const { data } = props;

  const iconLayer = new IconLayer({
    id: "icon-layer",
    data: data.features,
    pickable: true,
    getIcon: (d) => {
      //属性値のtypeをみてアイコンを出し分ける
      return icon_option[d.properties.type];
    },
    sizeScale: 6, //アイコンのサイズはここで調整する
    getSize: 5, //個別にサイズを変化させたい場合はコールバックを設定する
    getColor: [0, 120, 0, 255], //マーカーカラーを上塗りする(mask有効時のみ)
    getPosition: (d) => d.geometry.coordinates,
    onClick: (d) => {
      //マーカークリック時の処理
      console.log(d.object);
    },
  });

  //OSMタイルを読み込みベースマップとして表示
  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });

  return [tileLayer, iconLayer];
};
