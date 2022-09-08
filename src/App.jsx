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
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Mappp />
      </div>
    </div>
  );
}

export default App;
