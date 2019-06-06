import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class DisplayListPalette extends Component {
  render() {
    const { listPalettes } = this.props;
    return (
      <div>
        {listPalettes.map(palette => (
          <h1>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName} </Link>
          </h1>
        ))}
      </div>
    );
  }
}
