import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { GoogleMapDeck } from "./GoogleMapDeck";
import "./App.css";
import ReactMapGl from "./reactMapGl";
import NextMapTemp from "./nextMapTemp";
import { Mappp } from "./mappp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />
      <div style={{ width: "100vw", height: "100vh" }}>
        <GoogleMapDeck />
      </div> */}
      {/* <NextMapTemp /> */}
      {/* <ReactMapGl /> */}

      <Mappp />
    </div>
  );
}

export default App;
