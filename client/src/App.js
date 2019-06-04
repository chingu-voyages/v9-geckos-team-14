import React from "react";
import "./App.css";
import MainPallete from "./components/Pallete/MainPallete";
import ListColors from "./resources/ListColors";

function App() {
  return (
    <div className="App">
      <MainPallete {...ListColors[0]} />
    </div>
  );
}

export default App;
