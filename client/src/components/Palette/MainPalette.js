import React, { Component } from "react";
import "./MainPalette.css";
import ColorShades from "../ColorShades/ColorShades";
import Navbar from "../Navbar/Navbar";

export default class MainPalette extends Component {
  state = {
    level: 500
  };
  render() {
    const { colorShades } = this.props.palette;
    const displayColors = colorShades[this.state.level].map(color => (
      <ColorShades background={color.hex} name={color.name} />
    ));
    return (
      <div className="main-pallete">
        <Navbar />
        <div className="color-pallete">{displayColors}</div>
      </div>
    );
  }
}
