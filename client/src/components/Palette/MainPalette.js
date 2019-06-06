import React, { Component } from "react";
import "./MainPalette.css";
import ColorShades from "../ColorShades/ColorShades";

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
        <div className="color-pallete">{displayColors}</div>
      </div>
    );
  }
}
