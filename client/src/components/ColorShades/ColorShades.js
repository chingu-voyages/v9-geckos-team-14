import React, { Component } from "react";
import "./ColorShades.css";

export default class ColorShades extends Component {
  render() {
    const { background, name } = this.props;
    return (
      <div style={{ background }} className="ColorShades">
        <div className="color-content">
          <span>{name}</span>
        </div>
        <button className="copy-btn">Copy</button>
      </div>
    );
  }
}
