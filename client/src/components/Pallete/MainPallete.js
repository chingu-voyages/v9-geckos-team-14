import React, { Component } from "react";
import "./MainPallete.css";
import ColorShades from "../ColorShades/ColorShades";

export default class MainPallete extends Component {
  render() {
    const { colorShades } = this.props;
    const displayColors = colorShades.map(color => (
      <ColorShades background={color.color} name={color.name} />
    ));
    return (
      <div className="main-pallete">
        <div className="color-pallete">{displayColors}</div>
      </div>
    );
  }
}
