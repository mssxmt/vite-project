import styled, { keyframes } from "styled-components";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { GoogleMapDeck } from "./GoogleMapDeck";
import "./App.css";
import ReactMapGl from "./reactMapGl";
import NextMapTemp from "./nextMapTemp";
import { Mappp } from "./mappp";
import { IconLayeredMap } from "./IconAndMao/IconLayeredMap";
import { GoogleMapWithLayers } from "./googleMaapAndIconLayer/GoogleMapWithLayers";

const Fadein = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Box = styled.div`
  animation: Fadein 3s ease-out forwards;
  position: absolute;
  bottom: 100px;
  right: 100px;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background: #ffffff;
  color: black;
`;
function App() {
  const [count, setCount] = useState(0);
  const [positionData, setPositionData] = useState(null);
  const [popup, setPopup] = useState(false);

  return (
    <div className="App">
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "500px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <GoogleMapWithLayers setPositionData={setPositionData} /> */}
        <IconLayeredMap />
        {/* <Box>
          {positionData && (
            <>
              <p>properties:type:{positionData?.properties?.type}</p>
              <p>
                geometry:coordinates[0]{positionData?.geometry?.coordinates[0]}
              </p>
              <p>
                geometry:coordinates[1]{positionData?.geometry?.coordinates[1]}
              </p>
              <p>{JSON.stringify(positionData?.properties)}</p>
              <p>{JSON.stringify(positionData?.geometry)}</p>
            </>
          )}
        </Box> */}
      </div>
    </div>
  );
}

export default App;
